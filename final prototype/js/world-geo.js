/** Draw country boundaries and choropleth fills on a 2D equirectangular canvas. */

import {
    buildCountryLookup,
    casesChoroplethValue,
    choroplethCss,
    choroplethT,
    computeChoroplethExtents,
    matchFeatureToCountry
} from "./choropleth.js";

const MAP_ASPECT = 2;

function getMapFrame(width, height) {
    const padX = Math.min(32, Math.max(14, width * 0.025));
    const padY = Math.min(26, Math.max(12, height * 0.035));
    const availableWidth = Math.max(10, width - padX * 2);
    const availableHeight = Math.max(10, height - padY * 2);

    let frameWidth = availableWidth;
    let frameHeight = frameWidth / MAP_ASPECT;

    if (frameHeight > availableHeight) {
        frameHeight = availableHeight;
        frameWidth = frameHeight * MAP_ASPECT;
    }

    return {
        x: (width - frameWidth) / 2,
        y: (height - frameHeight) / 2,
        width: frameWidth,
        height: frameHeight
    };
}

function normalizeLng(lng) {
    let value = Number(lng);
    while (value > 180) value -= 360;
    while (value < -180) value += 360;
    return value;
}

function projectToFrame(lng, lat, frame) {
    return {
        x: frame.x + ((normalizeLng(lng) + 180) / 360) * frame.width,
        y: frame.y + ((90 - lat) / 180) * frame.height
    };
}

export function projectLngLat2d(lng, lat, width, height) {
    return projectToFrame(lng, lat, getMapFrame(width, height));
}

function lineToProjected(target, lng, lat, frame) {
    const point = projectToFrame(lng, lat, frame);
    target.lineTo(point.x, point.y);
}

function moveToProjected(target, lng, lat, frame) {
    const point = projectToFrame(lng, lat, frame);
    target.moveTo(point.x, point.y);
}

function getDatelineCrossing(prev, next) {
    const delta = next.lng - prev.lng;
    if (Math.abs(delta) <= 180) {
        return null;
    }

    const crossesEast = prev.lng > 0 && next.lng < 0;
    const edgeLng = crossesEast ? 180 : -180;
    const wrappedNextLng = next.lng + (crossesEast ? 360 : -360);
    const t = (edgeLng - prev.lng) / (wrappedNextLng - prev.lng);
    const lat = prev.lat + (next.lat - prev.lat) * Math.max(0, Math.min(1, t));

    return {
        edgeLng,
        oppositeLng: crossesEast ? -180 : 180,
        lat
    };
}

function traceRing(target, ring, frame, { closeBrokenSegments }) {
    if (!Array.isArray(ring) || ring.length < 2) {
        return;
    }

    let prev = null;
    let hasDatelineSplit = false;

    for (const coordinate of ring) {
        if (!Array.isArray(coordinate) || coordinate.length < 2) {
            continue;
        }

        const current = {
            lng: normalizeLng(coordinate[0]),
            lat: Number(coordinate[1])
        };

        if (!Number.isFinite(current.lng) || !Number.isFinite(current.lat)) {
            continue;
        }

        if (!prev) {
            moveToProjected(target, current.lng, current.lat, frame);
            prev = current;
            continue;
        }

        const crossing = getDatelineCrossing(prev, current);
        if (crossing) {
            hasDatelineSplit = true;
            lineToProjected(target, crossing.edgeLng, crossing.lat, frame);
            if (closeBrokenSegments) {
                target.closePath();
            }
            moveToProjected(target, crossing.oppositeLng, crossing.lat, frame);
        }

        lineToProjected(target, current.lng, current.lat, frame);
        prev = current;
    }

    if (!hasDatelineSplit || closeBrokenSegments) {
        target.closePath();
    }
}

function traceFeaturePath(target, feature, width, height, options = {}) {
    const geom = feature.geometry;
    if (!geom) {
        return;
    }

    const frame = getMapFrame(width, height);
    const polys = geom.type === "Polygon" ? [geom.coordinates] : (geom.coordinates || []);
    if (!Array.isArray(polys)) {
        return;
    }

    for (const poly of polys) {
        if (!Array.isArray(poly)) {
            continue;
        }
        for (const ring of poly) {
            traceRing(target, ring, frame, options);
        }
    }
}

export function buildFeaturePath2d(feature, width, height, options = {}) {
    const path = new Path2D();
    traceFeaturePath(path, feature, width, height, {
        closeBrokenSegments: true,
        ...options
    });
    return path;
}

function buildStrokePath2d(feature, width, height) {
    const path = new Path2D();
    traceFeaturePath(path, feature, width, height, {
        closeBrokenSegments: false
    });
    return path;
}

function buildRenderEntries(features, countries, timeIndex, width, height) {
    const lookup = buildCountryLookup(countries);
    const extents = computeChoroplethExtents(countries, timeIndex);

    return features.map((feature) => {
        const country = matchFeatureToCountry(feature, lookup);
        const value = country ? casesChoroplethValue(country, timeIndex) : 0;
        const hasData = value > 0;

        return {
            feature,
            country,
            iso: country?.iso3 || null,
            fillPath: buildFeaturePath2d(feature, width, height),
            strokePath: buildStrokePath2d(feature, width, height),
            fill: choroplethCss(choroplethT(value, extents), hasData)
        };
    });
}

export function drawWorldMap2d(ctx, features, width, height) {
    if (!features?.length || width < 10 || height < 10) {
        return;
    }

    const entries = buildRenderEntries(features, [], 0, width, height);
    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (const entry of entries) {
        ctx.fillStyle = "#e8edf4";
        ctx.fill(entry.fillPath);
    }

    ctx.strokeStyle = "rgba(71, 85, 105, 0.62)";
    ctx.lineWidth = 0.75;
    for (const entry of entries) {
        ctx.stroke(entry.strokePath);
    }

    ctx.restore();
}

export function drawChoropleth2d(ctx, features, countries, timeIndex, width, height, options = {}) {
    if (!features?.length || width < 10 || height < 10) {
        return;
    }

    const { selectedIso = null, hoverIso = null } = options;
    const entries = buildRenderEntries(features, countries, timeIndex, width, height);

    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (const entry of entries) {
        ctx.fillStyle = entry.fill;
        ctx.fill(entry.fillPath);
    }

    ctx.strokeStyle = "rgba(51, 65, 85, 0.5)";
    ctx.lineWidth = 0.75;
    for (const entry of entries) {
        ctx.stroke(entry.strokePath);
    }

    for (const entry of entries) {
        const isSelected = entry.iso && entry.iso === selectedIso;
        const isHovered = entry.iso && entry.iso === hoverIso;
        if (!isSelected && !isHovered) {
            continue;
        }

        ctx.strokeStyle = isSelected ? "#1d4ed8" : "#0f172a";
        ctx.lineWidth = isSelected ? 2.2 : 1.35;
        ctx.stroke(entry.strokePath);
    }

    ctx.restore();
}

export function hitTestChoropleth2d(features, countries, x, y, width, height) {
    if (!features?.length) {
        return null;
    }

    const lookup = buildCountryLookup(countries);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    for (let index = features.length - 1; index >= 0; index -= 1) {
        const feature = features[index];
        const country = matchFeatureToCountry(feature, lookup);
        if (!country) {
            continue;
        }

        const path = buildFeaturePath2d(feature, width, height);
        if (ctx.isPointInPath(path, x, y)) {
            return country;
        }
    }

    return null;
}
