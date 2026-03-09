import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";

export const fallbackCovid = [
    { name: "United States", iso3: "USA", lat: 38, lng: -97, cases: 103802702, deaths: 1123836, population: 339996563 },
    { name: "India", iso3: "IND", lat: 20, lng: 78, cases: 45035393, deaths: 533570, population: 1428627663 },
    { name: "Brazil", iso3: "BRA", lat: -14, lng: -51, cases: 38743918, deaths: 711380, population: 216422446 },
    { name: "United Kingdom", iso3: "GBR", lat: 55, lng: -3, cases: 24910000, deaths: 232000, population: 67736802 },
    { name: "France", iso3: "FRA", lat: 46, lng: 2, cases: 40138000, deaths: 167000, population: 64756584 },
    { name: "Japan", iso3: "JPN", lat: 36, lng: 138, cases: 33800000, deaths: 74694, population: 123294513 },
    { name: "China", iso3: "CHN", lat: 35, lng: 105, cases: 5033021, deaths: 5272, population: 1425671352 },
    { name: "Australia", iso3: "AUS", lat: -25, lng: 133, cases: 11853000, deaths: 24414, population: 26439111 }
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
