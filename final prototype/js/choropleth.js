import { getTimePoint } from "./timeline.js";

const NAME_ALIASES = {
    "united states of america": "USA",
    "democratic republic of the congo": "COD",
    "dominican republic": "DOM",
    czechia: "CZE",
    "bosnia and herzegovina": "BIH",
    "central african republic": "CAF",
    "s korea": "KOR",
    "south korea": "KOR",
    "north macedonia": "MKD",
    eswatini: "SWZ",
    myanmar: "MMR",
    burma: "MMR",
    taiwan: "CHN",
    "taiwan province of china": "CHN"
};

export function normalizeGeoName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

export function buildCountryLookup(countries = []) {
    const lookup = new Map();

    (countries || []).forEach((country) => {
        lookup.set(country.iso3, country);
        lookup.set(normalizeGeoName(country.name), country);
    });

    Object.entries(NAME_ALIASES).forEach(([name, iso3]) => {
        const match = countries.find((country) => country.iso3 === iso3);
        if (match) {
            lookup.set(name, match);
        }
    });

    return lookup;
}

export function matchFeatureToCountry(feature, lookup) {
    if (!feature || !lookup) {
        return null;
    }
    const featureName = feature.properties?.name || "";
    return lookup.get(normalizeGeoName(featureName)) || null;
}

/** Log-scaled cumulative cases for choropleth normalization */
export function casesChoroplethValue(country, timeIndex) {
    const point = getTimePoint(country, timeIndex);
    if (!point?.cases || point.cases <= 0) {
        return 0;
    }
    return Math.log10(point.cases + 1);
}

export function computeChoroplethExtents(countries = [], timeIndex) {
    const values = (countries || [])
        .map((country) => casesChoroplethValue(country, timeIndex))
        .filter((value) => value > 0);

    if (!values.length) {
        return { min: 0, max: 1 };
    }

    return {
        min: Math.min(...values),
        max: Math.max(...values)
    };
}

export function choroplethT(value, extents) {
    if (!value || value <= 0) {
        return 0;
    }
    const span = extents.max - extents.min;
    if (span <= 0) {
        return 0.5;
    }
    return Math.max(0, Math.min(1, (value - extents.min) / span));
}

/** Neutral land before cases are applied (white on 3D globe) */
export const LAND_NEUTRAL_RGB = { r: 248, g: 250, b: 252 };

/** Light blue (low) → deep red (high); t=0 uses neutral land color */
export function choroplethRgb(t, hasData = true) {
    if (!hasData || t <= 0) {
        return { ...LAND_NEUTRAL_RGB };
    }

    const clamped = Math.max(0, Math.min(1, t));
    const low = { r: 191, g: 219, b: 254 };
    const mid = { r: 59, g: 130, b: 246 };
    const high = { r: 190, g: 18, b: 60 };

    if (clamped < 0.5) {
        const mix = clamped / 0.5;
        return {
            r: Math.round(low.r + (mid.r - low.r) * mix),
            g: Math.round(low.g + (mid.g - low.g) * mix),
            b: Math.round(low.b + (mid.b - low.b) * mix)
        };
    }

    const mix = (clamped - 0.5) / 0.5;
    return {
        r: Math.round(mid.r + (high.r - mid.r) * mix),
        g: Math.round(mid.g + (high.g - mid.g) * mix),
        b: Math.round(mid.b + (high.b - mid.b) * mix)
    };
}

export function choroplethCss(t, hasData = true) {
    const { r, g, b } = choroplethRgb(t, hasData);
    return `rgb(${r},${g},${b})`;
}

export function choroplethHex(t, hasData = true) {
    const { r, g, b } = choroplethRgb(t, hasData);
    return (r << 16) + (g << 8) + b;
}
