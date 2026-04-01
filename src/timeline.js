export const TIMELINE_YEARS = [2019, 2020, 2021, 2022, 2023];
export const TIMELINE_DAYS = [];
const SYNTHETIC_OUTBREAK_START = Date.UTC(2020, 0, 22);

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

export function resolveGdpYears(gdp = {}) {
    const y2019 = Number.isFinite(gdp.y2019) ? gdp.y2019 : 0;
    const y2020 = Number.isFinite(gdp.y2020) ? gdp.y2020 : y2019;
    const y2021 = Number.isFinite(gdp.y2021) ? gdp.y2021 : y2020 + 1.2;
    const y2022 = Number.isFinite(gdp.y2022) ? gdp.y2022 : y2021 + 0.8;
    const y2023 = Number.isFinite(gdp.y2023) ? gdp.y2023 : y2022;

    return { y2019, y2020, y2021, y2022, y2023 };
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

<<<<<<< Updated upstream
function hasPositiveValues(historyMap) {
    return Boolean(historyMap) && Object.values(historyMap).some((value) => Number(value) > 0);
}

function getEconomicValueForDay(meta, gdpByYear, economicSeries) {
    if (!economicSeries || economicSeries.frequency === "annual") {
        return gdpByYear[meta.year] ?? 0;
    }

    if (economicSeries.frequency === "quarterly") {
        const quarter = Math.floor(meta.month / 3) + 1;
        return economicSeries.lookup?.get(`${meta.year}-Q${quarter}`) ?? (gdpByYear[meta.year] ?? 0);
    }

    if (economicSeries.frequency === "monthly") {
        const monthKey = `${meta.year}-${String(meta.month + 1).padStart(2, "0")}`;
        return economicSeries.lookup?.get(monthKey) ?? (gdpByYear[meta.year] ?? 0);
    }

    return gdpByYear[meta.year] ?? 0;
}

export function buildCountryTimeline(row, gdp, history = null, economicSeries = null) {
=======
function buildEstimatedCumulativeValue(total, meta, exponent = 2.2) {
    if (!Number.isFinite(total) || total <= 0) {
        return 0;
    }

    const current = Date.UTC(meta.year, meta.month, meta.day);
    if (current <= SYNTHETIC_OUTBREAK_START) {
        return 0;
    }

    const end = Date.UTC(2023, 11, 31, 23, 59, 59, 999);
    const progress = Math.max(0, Math.min(1, (current - SYNTHETIC_OUTBREAK_START) / Math.max(1, end - SYNTHETIC_OUTBREAK_START)));
    return Math.round(total * Math.pow(progress, exponent));
}

export function buildCountryTimeline(row, gdp, history = null) {
    const years = resolveGdpYears(gdp);
>>>>>>> Stashed changes
    const gdpByYear = {
        2019: years.y2019,
        2020: years.y2020,
        2021: years.y2021,
        2022: years.y2022,
        2023: years.y2023
    };

    const casesByDay = history ? buildDailyCumulativeMap(history.cases) : null;
    const deathsByDay = history ? buildDailyCumulativeMap(history.deaths) : null;
    const recoveredByDay = history?.recovered ? buildDailyCumulativeMap(history.recovered) : null;
    const hasCaseHistory = hasPositiveValues(history?.cases);
    const hasRecoveredHistory = hasPositiveValues(history?.recovered);
    const supportQuality = hasCaseHistory && hasRecoveredHistory ? "strong" : hasCaseHistory ? "weak" : "none";
    const timeline = {};
    const newCasesWindow = [];
    const newDeathsWindow = [];
    let rollingCases = 0;
    let rollingDeaths = 0;

    TIMELINE_DAYS.forEach((meta, index) => {
        const key = getTimeKey(meta.year, meta.month, meta.day);
        const prevMeta = TIMELINE_DAYS[Math.max(0, index - 1)];
        const prevKey = getTimeKey(prevMeta.year, prevMeta.month, prevMeta.day);
<<<<<<< Updated upstream
        const gdpValue = getEconomicValueForDay(meta, gdpByYear, economicSeries);
        const progress = Math.max(0, index / Math.max(1, TIMELINE_DAYS.length - 1));
        const cases = casesByDay ? casesByDay[key] : Math.round((row.cases || 0) * progress);
        const deaths = deathsByDay ? deathsByDay[key] : Math.round((row.deaths || 0) * progress);
        const prevCases = timeline[prevKey]?.totalCases ?? 0;
        const prevDeaths = timeline[prevKey]?.deaths ?? 0;
        const newCases = Math.max(0, cases - prevCases);
        const newDeaths = Math.max(0, deaths - prevDeaths);

        rollingCases += newCases;
        newCasesWindow.push(newCases);
        if (newCasesWindow.length > 28) {
            rollingCases -= newCasesWindow.shift();
        }

        rollingDeaths += newDeaths;
        newDeathsWindow.push(newDeaths);
        if (newDeathsWindow.length > 28) {
            rollingDeaths -= newDeathsWindow.shift();
        }

        const recovered = hasRecoveredHistory ? recoveredByDay[key] : null;
        const prevRecovered = timeline[prevKey]?.recovered ?? 0;
        const newRecovered = hasRecoveredHistory && recovered !== null
            ? Math.max(0, recovered - prevRecovered)
            : null;
        const active = hasRecoveredHistory && recovered !== null
            ? Math.max(0, cases - deaths - recovered)
            : null;
        const weakActiveProxy = hasCaseHistory
            ? Math.max(0, rollingCases - rollingDeaths)
            : 0;
        const clusterLoad = hasRecoveredHistory ? active : weakActiveProxy;
        const shock = gdpValue - (gdpByYear[2019] ?? 0);
        const recovery = meta.year < 2020 ? 0 : gdpValue - (gdpByYear[2020] ?? 0);
        const activePerMillion = row.population > 0 ? ((clusterLoad || 0) / row.population) * 1000000 : 0;
        const pressureLoad = hasRecoveredHistory ? (active || 0) : weakActiveProxy * 0.16;
        const pressurePerMillion = row.population > 0 ? (pressureLoad / row.population) * 1000000 : 0;
        const exposure = hasCaseHistory
            ? Math.log10(pressurePerMillion + 10) * Math.max(0.35, Math.min(10, Math.abs(Math.min(0, shock)) * 0.72 + Math.max(0, recovery * 0.22) + 0.32))
            : 0;
=======
        const prevGdp = timeline[prevKey]?.gdp ?? startGdp;
        const cases = casesByDay ? casesByDay[key] : buildEstimatedCumulativeValue(row.cases || 0, meta, 2.1);
        const deaths = deathsByDay ? deathsByDay[key] : buildEstimatedCumulativeValue(row.deaths || 0, meta, 2.35);
        const shock = meta.year <= 2019 ? 0 : (index === 0 ? 0 : gdpValue - prevGdp);
        const recovery = meta.year <= 2020 ? 0 : gdpValue - (gdpByYear[2020] ?? 0);
        const perMillion = row.population > 0 ? (cases / row.population) * 1000000 : 0;
        const exposure = Math.log10(perMillion + 10) * Math.max(0.45, Math.min(14, Math.abs(Math.min(0, shock)) * 8 + Math.max(0, recovery * 0.8)));
>>>>>>> Stashed changes
        timeline[key] = {
            key,
            year: meta.year,
            month: meta.month,
            day: meta.day,
            gdp: gdpValue,
            totalCases: cases,
            cases,
            active,
            clusterLoad,
            recovered,
            deaths,
            newCases,
            newRecovered,
            newDeaths,
            shock,
            recovery,
            exposure,
            phaseLabel: PHASE_BY_YEAR[meta.year],
            hasCaseHistory,
            hasRecoveredHistory,
            supportQuality
        };
    });

    Object.defineProperty(timeline, "__support", {
        value: {
            hasCaseHistory,
            hasRecoveredHistory,
            supportQuality
        },
        enumerable: false
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
            active: 27,
            clusterLoad: 27,
            totalCases: 27,
            recovered: 0,
            deaths: 0,
            newCases: 27,
            newRecovered: 0,
            newDeaths: 0,
            gdp: country.gdp2019,
            shock: 0,
            recovery: 0,
            exposure: 1.1,
            phaseLabel: "Documented origin stage",
            hasCaseHistory: true,
            hasRecoveredHistory: true,
            supportQuality: "strong"
        };
    }
    return country.timeline?.[key] || {
        key,
        cases: country.cases,
        active: country.active ?? country.cases,
        clusterLoad: country.active ?? country.cases,
        totalCases: country.cases,
        recovered: country.recovered ?? 0,
        deaths: country.deaths,
        newCases: 0,
        newRecovered: 0,
        newDeaths: 0,
        gdp: country.gdp2020,
        shock: country.shock,
        recovery: country.recovery,
        exposure: country.exposure,
        phaseLabel: "Default",
        hasCaseHistory: Boolean(country.cases),
        hasRecoveredHistory: Number.isFinite(country.recovered),
        supportQuality: Number.isFinite(country.recovered) ? "strong" : "weak"
    };
}
