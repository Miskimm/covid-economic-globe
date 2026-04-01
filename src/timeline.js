export const TIMELINE_YEARS = [2019, 2020, 2021, 2022, 2023];
export const TIMELINE_DAYS = [];

const PHASE_BY_YEAR = {
    2019: "Documented origin stage",
    2020: "Initial shock",
    2021: "Global spread",
    2022: "Lagging pressure",
    2023: "Post-pandemic stock"
};

{
    const start = new Date(Date.UTC(2019, 11, 1));
    const end = new Date(Date.UTC(2023, 11, 31));
    const cursor = new Date(start);
    while (cursor <= end) {
        TIMELINE_DAYS.push({
            year: cursor.getUTCFullYear(),
            month: cursor.getUTCMonth(),
            day: cursor.getUTCDate()
        });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
}

export function getTimeKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getInitialTimeIndex(search) {
    const params = new URLSearchParams(search);
    const initialYearParam = Number(params.get("year"));
    const initialMonthParam = Number(params.get("month"));
    const initialDayParam = Number(params.get("day"));

    if (
        TIMELINE_YEARS.includes(initialYearParam) &&
        Number.isInteger(initialMonthParam) &&
        initialMonthParam >= 1 &&
        initialMonthParam <= 12 &&
        Number.isInteger(initialDayParam) &&
        initialDayParam >= 1 &&
        initialDayParam <= 31
    ) {
        const idx = TIMELINE_DAYS.findIndex(
            (item) => item.year === initialYearParam && item.month === initialMonthParam - 1 && item.day === initialDayParam
        );
        return idx >= 0 ? idx : 0;
    }

    if (TIMELINE_YEARS.includes(initialYearParam)) {
        const idx = TIMELINE_DAYS.findIndex((item) => item.year === initialYearParam);
        return idx >= 0 ? idx : 0;
    }

    return 0;
}

export function getSelectedDayMeta(timeIndex) {
    return TIMELINE_DAYS[timeIndex] || TIMELINE_DAYS[0];
}

export function getSelectedLabel(timeIndex) {
    const meta = getSelectedDayMeta(timeIndex);
    return `${meta.year}-${String(meta.month + 1).padStart(2, "0")}-${String(meta.day).padStart(2, "0")}`;
}

function parseHistoryDate(value) {
    const [m, d, y] = value.split("/").map(Number);
    return new Date(Date.UTC(2000 + y, m - 1, d));
}

function buildDailyCumulativeMap(historyMap) {
    const entries = Object.entries(historyMap || {})
        .map(([date, value]) => ({ date: parseHistoryDate(date), value }))
        .filter((entry) => !Number.isNaN(entry.date.getTime()))
        .sort((a, b) => a.date - b.date);

    const output = {};
    let cursor = 0;
    let lastValue = 0;
    for (const meta of TIMELINE_DAYS) {
        const dayEnd = new Date(Date.UTC(meta.year, meta.month, meta.day, 23, 59, 59, 999));
        while (cursor < entries.length && entries[cursor].date <= dayEnd) {
            lastValue = entries[cursor].value;
            cursor += 1;
        }
        output[getTimeKey(meta.year, meta.month, meta.day)] = lastValue;
    }
    return output;
}

export function buildCountryTimeline(row, gdp, history = null) {
    const gdpByYear = {
        2019: Number.isFinite(gdp.y2019) ? gdp.y2019 : 0,
        2020: Number.isFinite(gdp.y2020) ? gdp.y2020 : 0,
        2021: Number.isFinite(gdp.y2021) ? gdp.y2021 : (Number.isFinite(gdp.y2020) ? gdp.y2020 + 1.2 : 0),
        2022: Number.isFinite(gdp.y2022) ? gdp.y2022 : (Number.isFinite(gdp.y2021) ? gdp.y2021 + 0.8 : 0),
        2023: Number.isFinite(gdp.y2023) ? gdp.y2023 : 0
    };

    const casesByDay = history ? buildDailyCumulativeMap(history.cases) : null;
    const deathsByDay = history ? buildDailyCumulativeMap(history.deaths) : null;
    const timeline = {};

    TIMELINE_DAYS.forEach((meta, index) => {
        const key = getTimeKey(meta.year, meta.month, meta.day);
        const prevMeta = TIMELINE_DAYS[Math.max(0, index - 1)];
        const yearStart = Date.UTC(meta.year, 0, 1);
        const yearEnd = Date.UTC(meta.year, 11, 31);
        const current = Date.UTC(meta.year, meta.month, meta.day);
        const yearProgress = (current - yearStart) / Math.max(1, yearEnd - yearStart);
        const nextYear = Math.min(2023, meta.year + 1);
        const startGdp = gdpByYear[meta.year] ?? 0;
        const endGdp = gdpByYear[nextYear] ?? startGdp;
        const gdpValue = startGdp + (endGdp - startGdp) * yearProgress;
        const prevKey = getTimeKey(prevMeta.year, prevMeta.month, prevMeta.day);
        const prevGdp = timeline[prevKey]?.gdp ?? startGdp;
        const cases = casesByDay ? casesByDay[key] : Math.round((row.cases || 0) * Math.max(0, index / Math.max(1, TIMELINE_DAYS.length - 1)));
        const deaths = deathsByDay ? deathsByDay[key] : Math.round((row.deaths || 0) * Math.max(0, index / Math.max(1, TIMELINE_DAYS.length - 1)));
        const shock = meta.year <= 2019 ? 0 : (index === 0 ? 0 : gdpValue - prevGdp);
        const recovery = meta.year <= 2020 ? 0 : gdpValue - (gdpByYear[2020] ?? 0);
        const perMillion = row.population > 0 ? (cases / row.population) * 1000000 : 0;
        const exposure = Math.log10(perMillion + 10) * Math.max(0.45, Math.min(14, Math.abs(Math.min(0, shock)) * 8 + Math.max(0, recovery * 0.8)));
        timeline[key] = {
            key,
            year: meta.year,
            month: meta.month,
            day: meta.day,
            gdp: gdpValue,
            cases,
            deaths,
            shock,
            recovery,
            exposure,
            phaseLabel: PHASE_BY_YEAR[meta.year]
        };
    });

    return timeline;
}

export function getTimePoint(country, timeIndex) {
    const meta = getSelectedDayMeta(timeIndex);
    const key = getTimeKey(meta.year, meta.month, meta.day);
    if (timeIndex === 0 && country.iso3 === "CHN") {
        return {
            key,
            year: 2019,
            month: 11,
            day: 1,
            cases: 27,
            deaths: 0,
            gdp: country.gdp2019,
            shock: 0,
            recovery: 0,
            exposure: 1.1,
            phaseLabel: "Documented origin stage"
        };
    }
    return country.timeline?.[key] || {
        key,
        cases: country.cases,
        deaths: country.deaths,
        gdp: country.gdp2020,
        shock: country.shock,
        recovery: country.recovery,
        exposure: country.exposure,
        phaseLabel: "Default"
    };
}
