import { drawChoropleth2d, hitTestChoropleth2d, projectLngLat2d } from "./world-geo.js";

export function createMap2d(canvas, { onSelect, onHover }) {
    const ctx = canvas.getContext("2d");
    let countries = [];
    let worldFeatures = null;
    let timeIndex = 0;
    let selectedIso = null;
    let hoverIso = null;

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

        const gradient = ctx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, "#eef2f7");
        gradient.addColorStop(1, "#f8fafc");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        if (!worldFeatures) {
            ctx.fillStyle = "#64748b";
            ctx.font = "13px system-ui,sans-serif";
            ctx.fillText("Loading world map…", 16, 32);
            return;
        }

        if (countries.length) {
            drawChoropleth2d(ctx, worldFeatures, countries, timeIndex, w, h, {
                selectedIso,
                hoverIso
            });
        } else {
            drawChoropleth2d(ctx, worldFeatures, [], timeIndex, w, h);
        }

        if (selectedIso && countries.length) {
            const country = countries.find((item) => item.iso3 === selectedIso);
            if (country) {
                const { x, y } = projectLngLat2d(country.lng, country.lat, w, h);
                ctx.fillStyle = "#1e293b";
                ctx.font = "600 11px system-ui,sans-serif";
                ctx.fillText(country.name, x + 8, y + 4);
            }
        }

        ctx.fillStyle = "#64748b";
        ctx.font = "11px system-ui,sans-serif";
        ctx.fillText("Cumulative cases (log scale) · click a country · drag timeline below", 12, h - 10);
    }

    function hitTest(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        if (!worldFeatures?.length || !countries.length) {
            return null;
        }

        return hitTestChoropleth2d(worldFeatures, countries, x, y, w, h);
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
        resize,
        destroy() {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", resize);
        }
    };
}
