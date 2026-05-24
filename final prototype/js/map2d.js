import { drawChoropleth2d, hitTestChoropleth2d, projectLngLat2d } from "./world-geo.js";

export function createMap2d(canvas, { onSelect, onHover }) {
    const ctx = canvas.getContext("2d");
    let countries = [];
    let worldFeatures = null;
    let timeIndex = 0;
    let selectedIso = null;
    let hoverIso = null;
    const view = {
        zoom: 1,
        panX: 0,
        panY: 0
    };

    function clampZoom(value) {
        return Math.max(1, Math.min(5, value));
    }

    function applyMapTransform(w, h) {
        ctx.translate(w / 2 + view.panX, h / 2 + view.panY);
        ctx.scale(view.zoom, view.zoom);
        ctx.translate(-w / 2, -h / 2);
    }

    function toMapPoint(x, y, w, h) {
        return {
            x: w / 2 + (x - w / 2 - view.panX) / view.zoom,
            y: h / 2 + (y - h / 2 - view.panY) / view.zoom
        };
    }

    function toScreenPoint(x, y, w, h) {
        return {
            x: w / 2 + view.panX + (x - w / 2) * view.zoom,
            y: h / 2 + view.panY + (y - h / 2) * view.zoom
        };
    }

    function setZoom(nextZoom, anchorX, anchorY) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        const clamped = clampZoom(nextZoom);
        const anchor = {
            x: Number.isFinite(anchorX) ? anchorX : w / 2,
            y: Number.isFinite(anchorY) ? anchorY : h / 2
        };
        const mapPoint = toMapPoint(anchor.x, anchor.y, w, h);
        view.zoom = clamped;
        view.panX = anchor.x - w / 2 - (mapPoint.x - w / 2) * view.zoom;
        view.panY = anchor.y - h / 2 - (mapPoint.y - h / 2) * view.zoom;
        draw();
    }

    function resize() {
        const parent = canvas.parentElement;
        if (!parent) {
            return;
        }
        const rect = parent.getBoundingClientRect();
        const w = Math.max(rect.width, 320);
        const h = Math.max(rect.height, 240);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
    }

    function draw() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        if (w < 10 || h < 10) {
            return;
        }

        ctx.clearRect(0, 0, w, h);

        const gradient = ctx.createRadialGradient(w * 0.5, h * 0.38, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.72);
        gradient.addColorStop(0, "#10223a");
        gradient.addColorStop(0.48, "#07111f");
        gradient.addColorStop(1, "#020713");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.strokeStyle = "rgba(104, 228, 255, 0.055)";
        ctx.lineWidth = 1;
        const gridSize = 72;
        for (let x = 0; x <= w; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
        }
        for (let y = 0; y <= h; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
        ctx.restore();

        if (!worldFeatures) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
            ctx.font = "13px system-ui,sans-serif";
            ctx.fillText("Loading world map…", 16, 32);
            return;
        }

        if (countries.length) {
            ctx.save();
            applyMapTransform(w, h);
            drawChoropleth2d(ctx, worldFeatures, countries, timeIndex, w, h, {
                selectedIso,
                hoverIso
            });
            ctx.restore();
        } else {
            ctx.save();
            applyMapTransform(w, h);
            drawChoropleth2d(ctx, worldFeatures, [], timeIndex, w, h);
            ctx.restore();
        }

        if (selectedIso && countries.length) {
            const country = countries.find((item) => item.iso3 === selectedIso);
            if (country) {
                const projected = projectLngLat2d(country.lng, country.lat, w, h);
                const { x, y } = toScreenPoint(projected.x, projected.y, w, h);
                ctx.fillStyle = "rgba(236, 249, 255, 0.92)";
                ctx.shadowColor = "rgba(104, 228, 255, 0.45)";
                ctx.shadowBlur = 12;
                ctx.font = "600 11px system-ui,sans-serif";
                ctx.fillText(country.name, x + 8, y + 4);
                ctx.shadowBlur = 0;
            }
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
        ctx.font = "11px system-ui,sans-serif";
        ctx.fillText("Cumulative cases (log scale) · click a country · drag timeline below", 12, h - 10);
    }

    function hitTest(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const w = rect.width;
        const h = rect.height;
        const mapPoint = toMapPoint(x, y, w, h);

        if (!worldFeatures?.length || !countries.length) {
            return null;
        }

        return hitTestChoropleth2d(worldFeatures, countries, mapPoint.x, mapPoint.y, w, h);
    }

    canvas.addEventListener("click", (event) => {
        const country = hitTest(event.clientX, event.clientY);
        onSelect?.(country, event.clientX, event.clientY);
    });

    canvas.addEventListener("mousemove", (event) => {
        const country = hitTest(event.clientX, event.clientY);
        const iso = country?.iso3 || null;
        if (iso !== hoverIso) {
            hoverIso = iso;
            canvas.style.cursor = country ? "pointer" : "default";
            onHover?.(country, event.clientX, event.clientY);
            draw();
        }
    });

    canvas.addEventListener("mouseleave", () => {
        if (!hoverIso) {
            return;
        }
        hoverIso = null;
        canvas.style.cursor = "default";
        onHover?.(null, 0, 0);
        draw();
    });

    canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        setZoom(view.zoom * (event.deltaY > 0 ? 0.88 : 1.14), event.clientX - rect.left, event.clientY - rect.top);
    }, { passive: false });

    const resizeObserver = typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => resize())
        : null;
    if (resizeObserver && canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", resize);

    return {
        setFeatures(features) {
            worldFeatures = features;
            draw();
        },
        setCountries(list) {
            countries = list;
            draw();
        },
        setTimeIndex(index) {
            timeIndex = index;
            draw();
        },
        setSelected(iso) {
            selectedIso = iso;
            draw();
        },
        zoomIn() {
            setZoom(view.zoom * 1.25);
        },
        zoomOut() {
            setZoom(view.zoom * 0.8);
        },
        resetZoom() {
            view.zoom = 1;
            view.panX = 0;
            view.panY = 0;
            draw();
        },
        resize,
        destroy() {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", resize);
        }
    };
}
