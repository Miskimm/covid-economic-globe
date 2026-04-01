import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

export const fallbackCovid = [
    { name: "United States", iso3: "USA", lat: 38, lng: -97, cases: 103802702, deaths: 1123836, recovered: 100212410, active: 246456, population: 339996563 },
    { name: "India", iso3: "IND", lat: 20, lng: 78, cases: 45035393, deaths: 533570, recovered: 44477606, active: 24217, population: 1428627663 },
    { name: "Brazil", iso3: "BRA", lat: -14, lng: -51, cases: 38743918, deaths: 711380, recovered: 37906766, active: 125772, population: 216422446 },
    { name: "United Kingdom", iso3: "GBR", lat: 55, lng: -3, cases: 24910000, deaths: 232000, recovered: 24612000, active: 66000, population: 67736802 },
    { name: "France", iso3: "FRA", lat: 46, lng: 2, cases: 40138000, deaths: 167000, recovered: 39830000, active: 141000, population: 64756584 },
    { name: "Japan", iso3: "JPN", lat: 36, lng: 138, cases: 33800000, deaths: 74694, recovered: 33648206, active: 770100, population: 123294513 },
    { name: "China", iso3: "CHN", lat: 35, lng: 105, cases: 5033021, deaths: 5272, recovered: 5022409, active: 5340, population: 1425671352 },
    { name: "Australia", iso3: "AUS", lat: -25, lng: 133, cases: 11853000, deaths: 24414, recovered: 11790130, active: 38456, population: 26439111 }
];

export const fallbackGdp = {
    USA: { y2019: 2.3, y2020: -2.2, y2021: 5.8, y2022: 1.9, y2023: 2.9 },
    IND: { y2019: 3.9, y2020: -5.8, y2021: 9.1, y2022: 7.2, y2023: 8.2 },
    BRA: { y2019: 1.2, y2020: -3.3, y2021: 5.0, y2022: 3.0, y2023: 2.9 },
    GBR: { y2019: 1.6, y2020: -10.4, y2021: 8.7, y2022: 4.8, y2023: 0.1 },
    FRA: { y2019: 1.9, y2020: -7.5, y2021: 6.8, y2022: 2.5, y2023: 0.9 },
    JPN: { y2019: -0.4, y2020: -4.2, y2021: 2.7, y2022: 1.0, y2023: 1.9 },
    CHN: { y2019: 6.0, y2020: 2.2, y2021: 8.4, y2022: 3.0, y2023: 5.2 },
    AUS: { y2019: 1.9, y2020: -1.8, y2021: 5.6, y2022: 3.7, y2023: 1.6 }
};

const HISTORY_ALIASES = {
    Palestine: ["West Bank and Gaza"],
    Myanmar: ["Burma"],
    "Hong Kong": [],
    "South Korea": ["Korea, South"],
    Eswatini: ["Swaziland"],
    Macau: ["Macao"],
    "North Macedonia": ["Macedonia"],
    Syria: ["Syrian Arab Republic"],
    Libya: ["Libyan Arab Jamahiriya"]
};

function normalizeCountryName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function mergeCumulativeSeries(base = {}, addition = {}) {
    const merged = { ...base };
    Object.entries(addition || {}).forEach(([date, value]) => {
        merged[date] = Number(merged[date] || 0) + Number(value || 0);
    });
    return merged;
}

function mergeTimeline(base = {}, addition = {}) {
    return {
        cases: mergeCumulativeSeries(base.cases, addition.cases),
        deaths: mergeCumulativeSeries(base.deaths, addition.deaths),
        recovered: mergeCumulativeSeries(base.recovered, addition.recovered)
    };
}

export async function loadWorldFeatures() {
    const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json", { cache: "force-cache" });
    if (!res.ok) {
        throw new Error(`world map ${res.status}`);
    }
    const topology = await res.json();
    return feature(topology, topology.objects.countries).features;
}

export async function loadCovidRows() {
    const res = await fetch("https://disease.sh/v3/covid-19/countries?allowNull=false", { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`covid api ${res.status}`);
    }
    const rows = await res.json();
    return rows.map((row) => ({
        country: row.country,
        iso3: row.countryInfo?.iso3,
        lat: row.countryInfo?.lat,
        lng: row.countryInfo?.long,
        cases: row.cases,
        deaths: row.deaths,
        recovered: row.recovered,
        active: row.active,
        population: row.population
    }));
}

export async function loadGdpMap() {
    const res = await fetch("https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=20000&date=2019:2023", {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error(`world bank ${res.status}`);
    }
    const payload = await res.json();
    const rows = Array.isArray(payload) ? payload[1] || [] : [];
    const map = {};
    for (const row of rows) {
        if (!row.countryiso3code || row.value === null) {
            continue;
        }
        map[row.countryiso3code] ||= {};
        map[row.countryiso3code][`y${row.date}`] = Number(row.value);
    }
    return map;
}

function parseCsvLine(line) {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        const next = line[i + 1];

        if (char === "\"") {
            if (inQuotes && next === "\"") {
                current += "\"";
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            values.push(current);
            current = "";
            continue;
        }

        current += char;
    }

    values.push(current);
    return values;
}

export async function loadOecdQuarterlyGdpMap() {
    const res = await fetch(
        "https://sdmx.oecd.org/public/rest/data/OECD.SDD.NAD,DSD_NAMAIN1@DF_QNA_EXPENDITURE_GROWTH_OECD/Q.....B1GQ......G1.?startPeriod=2019-Q1&dimensionAtObservation=AllDimensions&format=csvfilewithlabels",
        { cache: "no-store" }
    );
    if (!res.ok) {
        throw new Error(`oecd quarterly gdp ${res.status}`);
    }

    const text = await res.text();
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) {
        return {};
    }

    const header = parseCsvLine(lines[0]);
    const isoIndex = header.indexOf("REF_AREA");
    const periodIndex = header.indexOf("TIME_PERIOD");
    const valueIndex = header.indexOf("OBS_VALUE");

    if (isoIndex < 0 || periodIndex < 0 || valueIndex < 0) {
        throw new Error("oecd quarterly gdp header mismatch");
    }

    const map = {};
    lines.slice(1).forEach((line) => {
        const cols = parseCsvLine(line);
        const iso3 = cols[isoIndex];
        const period = cols[periodIndex];
        const value = Number(cols[valueIndex]);

        if (!iso3 || !period || !Number.isFinite(value)) {
            return;
        }

        map[iso3] ||= [];
        map[iso3].push({
            period,
            value
        });
    });

    Object.values(map).forEach((series) => {
        series.sort((a, b) => a.period.localeCompare(b.period));
    });

    return map;
}

export async function loadCountryHistory(countryName) {
    const candidates = Object.prototype.hasOwnProperty.call(HISTORY_ALIASES, countryName)
        ? HISTORY_ALIASES[countryName]
        : [countryName];

    for (const candidate of candidates) {
        const res = await fetch(`https://disease.sh/v3/covid-19/historical/${encodeURIComponent(candidate)}?lastdays=all`, {
            cache: "no-store"
        });
        if (!res.ok) {
            continue;
        }
        const payload = await res.json();
        return payload?.timeline || null;
    }

    return null;
}

export async function loadAllCountryHistories() {
    const res = await fetch("https://disease.sh/v3/covid-19/historical?lastdays=all", {
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error(`covid all histories ${res.status}`);
    }

    const rows = await res.json();
    const map = new Map();

    rows.forEach((row) => {
        if (!row?.country || !row?.timeline) {
            return;
        }
        const key = normalizeCountryName(row.country);
        const existing = map.get(key);
        map.set(key, existing ? mergeTimeline(existing, row.timeline) : row.timeline);
    });

    return map;
}

export function resolveHistoryFromMap(historyMap, countryName) {
    if (!historyMap?.size) {
        return null;
    }

    const candidates = [
        countryName,
        ...(Object.prototype.hasOwnProperty.call(HISTORY_ALIASES, countryName) ? HISTORY_ALIASES[countryName] : [])
    ];

    let merged = null;
    candidates.forEach((candidate) => {
        const timeline = historyMap.get(normalizeCountryName(candidate));
        if (timeline) {
            merged = merged ? mergeTimeline(merged, timeline) : timeline;
        }
    });

    if (normalizeCountryName(countryName) === "china") {
        const taiwanTimeline = historyMap.get("taiwan");
        if (taiwanTimeline) {
            merged = merged ? mergeTimeline(merged, taiwanTimeline) : taiwanTimeline;
        }
    }

    return merged;
}
