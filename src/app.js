import { fallbackCovid, fallbackGdp, loadAllCountryHistories, loadCountryHistory, loadCovidRows, loadGdpMap, loadOecdQuarterlyGdpMap, loadWorldFeatures, resolveHistoryFromMap } from "./data.js";
import { formatCompact, formatSigned } from "./format.js";
import { createGlobe } from "./globe.js";
<<<<<<< Updated upstream
import { buildCountryTimeline, getInitialTimeIndex, getSelectedDayMeta, getSelectedLabel, getTimePoint, TIMELINE_DAYS } from "./timeline.js";
=======
import { buildCountryTimeline, getInitialTimeIndex, getSelectedDayMeta, getSelectedLabel, getTimePoint, resolveGdpYears, TIMELINE_DAYS, TIMELINE_YEARS } from "./timeline.js";
>>>>>>> Stashed changes

const config = {
    minPopulation: 250000
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dom = {
    stage: document.getElementById("stage"),
    tooltip: document.getElementById("tooltip"),
    loading: document.getElementById("loading"),
    loadingText: document.getElementById("loadingText"),
    status: document.getElementById("status"),
    avgShock: document.getElementById("avgShock"),
    avgRecovery: document.getElementById("avgRecovery"),
    focusMarket: document.getElementById("focusMarket"),
    focusMarketNote: document.getElementById("focusMarketNote"),
    countryName: document.getElementById("countryName"),
    impactBadge: document.getElementById("impactBadge"),
    activeCasesValue: document.getElementById("activeCasesValue"),
    casesValue: document.getElementById("casesValue"),
    recoveredValue: document.getElementById("recoveredValue"),
    deathsValue: document.getElementById("deathsValue"),
    shockValue: document.getElementById("shockValue"),
    recoveryValue: document.getElementById("recoveryValue"),
    detailNote: document.getElementById("detailNote"),
    countrySearch: document.getElementById("countrySearch"),
    countryOptions: document.getElementById("countryOptions"),
    countryJump: document.getElementById("countryJump"),
    tickerText: document.getElementById("tickerText"),
    timelineSlider: document.getElementById("timelineSlider"),
    timelineValue: document.getElementById("timelineValue"),
    timelineOrigin: document.getElementById("timelineOrigin"),
    timelinePoints: document.getElementById("timelinePoints"),
    timelineRuler: document.getElementById("timelineRuler"),
    timelineProgress: document.getElementById("timelineProgress"),
    timelineThumb: document.getElementById("timelineThumb"),
    playToggle: document.getElementById("playToggle"),
    jumpStart: document.getElementById("jumpStart"),
    sourceNote: document.getElementById("sourceNote"),
    chartLabel: document.getElementById("chartLabel"),
    chartCountry: document.getElementById("chartCountry"),
    shockChip: document.getElementById("shockChip"),
    impactFill: document.getElementById("impactFill"),
    barChart: document.getElementById("barChart")
};

const state = {
    countries: [],
    selectedCountry: null,
    lockedCountryIso: null,
    selectedTimeIndex: getInitialTimeIndex(window.location.search),
    isPlaying: false,
    playTimer: null,
    sourceSummary: "live data sources"
};

const globe = createGlobe({
    stage: dom.stage,
    initialTimeIndex: state.selectedTimeIndex,
    onCountryHover: handleCountryHover,
    onCountryClick: handleCountryClick
});

function setStatus(text) {
    dom.status.textContent = text;
    dom.loadingText.textContent = text;
}

function setLoading(isLoading) {
    dom.loading.classList.toggle("is-hidden", !isLoading);
}

function consolidateCovidRows(rows) {
    const result = [];
    let chinaRow = null;

    for (const row of rows) {
        const iso3 = row.iso3;
        const name = String(row.name || row.country || "");
        const isTaiwan = iso3 === "TWN" || /taiwan/i.test(name);

        if (iso3 === "CHN") {
            chinaRow = { ...row, name: "China" };
            result.push(chinaRow);
            continue;
        }

        if (isTaiwan) {
            if (!chinaRow) {
                chinaRow = {
                    name: "China",
                    country: "China",
                    iso3: "CHN",
                    lat: 35,
                    lng: 105,
                    cases: 0,
                    deaths: 0,
                    population: 0
                };
                result.push(chinaRow);
            }
            chinaRow.cases += Number(row.cases || 0);
            chinaRow.deaths += Number(row.deaths || 0);
            chinaRow.recovered = Number(chinaRow.recovered || 0) + Number(row.recovered || 0);
            chinaRow.active = Number(chinaRow.active || 0) + Number(row.active || 0);
            chinaRow.population += Number(row.population || 0);
            continue;
        }

        result.push(row);
    }

    return result;
}

function buildEconomicSeries(gdp, quarterlySeries = null) {
    const annualPoints = [2019, 2020, 2021, 2022, 2023]
        .map((year) => ({
            key: String(year),
            label: String(year),
            year,
            value: gdp[`y${year}`]
        }))
        .filter((point) => Number.isFinite(point.value));

    if (Array.isArray(quarterlySeries) && quarterlySeries.length) {
        const lookup = new Map();
        const points = quarterlySeries
            .filter((entry) => Number.isFinite(entry.value) && /^\d{4}-Q[1-4]$/.test(entry.period))
            .map((entry) => {
                lookup.set(entry.period, entry.value);
                const [yearText, quarterText] = entry.period.split("-Q");
                return {
                    key: entry.period,
                    label: `Q${quarterText}`,
                    year: Number(yearText),
                    quarter: Number(quarterText),
                    value: entry.value
                };
            });

        if (points.length) {
            return {
                frequency: "quarterly",
                label: "Quarterly",
                lookup,
                points
            };
        }
    }

    return {
        frequency: "annual",
        label: "Annual only",
        lookup: new Map(annualPoints.map((point) => [point.key, point.value])),
        points: annualPoints
    };
}

function normalizeCountries(covidRows, gdpMap, quarterlyGdpMap = {}) {
    return consolidateCovidRows(covidRows)
        .map((row) => {
            const gdp = gdpMap[row.iso3];
            if (!row.iso3 || !gdp || !Number.isFinite(row.lat) || !Number.isFinite(row.lng) || row.population < config.minPopulation) {
                return null;
            }
<<<<<<< Updated upstream
            const economicSeries = buildEconomicSeries(gdp, quarterlyGdpMap[row.iso3]);
            const shock = gdp.y2020 - gdp.y2019;
            const recovery = gdp.y2023 - gdp.y2020;
            const active = Number(row.active || Math.max(0, (row.cases || 0) - (row.deaths || 0) - (row.recovered || 0)));
            const recovered = Number(row.recovered || 0);
            const activePerMillion = (active / row.population) * 1000000;
            const exposure = Math.log10(activePerMillion + 10) * Math.max(0.7, Math.min(14, Math.abs(Math.min(0, shock))));
=======
            const gdpYears = resolveGdpYears(gdp);
            const shock = gdpYears.y2020 - gdpYears.y2019;
            const recovery = gdpYears.y2023 - gdpYears.y2020;
            const casesPerMillion = (row.cases / row.population) * 1000000;
            const exposure = Math.log10(casesPerMillion + 10) * Math.max(0.7, Math.min(14, Math.abs(Math.min(0, shock))));
>>>>>>> Stashed changes
            return {
                name: row.name || row.country,
                iso3: row.iso3,
                lat: row.lat,
                lng: row.lng,
                cases: row.cases,
                active,
                recovered,
                deaths: row.deaths,
                population: row.population,
<<<<<<< Updated upstream
                gdp2019: gdp.y2019,
                gdp2020: gdp.y2020,
                gdp2021: gdp.y2021,
                gdp2022: gdp.y2022,
                gdp2023: gdp.y2023,
                economicSeries,
                shock,
                recovery,
                exposure,
                timeline: buildCountryTimeline(row, gdp, null, economicSeries),
                historySupport: "weak"
=======
                gdp2019: gdpYears.y2019,
                gdp2020: gdpYears.y2020,
                gdp2021: gdpYears.y2021,
                gdp2022: gdpYears.y2022,
                gdp2023: gdpYears.y2023,
                shock,
                recovery,
                exposure,
                timeline: buildCountryTimeline(row, gdpYears)
>>>>>>> Stashed changes
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.exposure - a.exposure);
}

function getActivityLoad(point) {
    return Number.isFinite(point?.clusterLoad)
        ? point.clusterLoad
        : Number.isFinite(point?.active)
            ? point.active
            : 0;
}

function formatCaseMetric(point, metric) {
    if (metric === "active") {
        return point?.hasRecoveredHistory ? formatCompact(point.active) : "Limited";
    }
    if (metric === "recovered") {
        return point?.hasRecoveredHistory ? formatCompact(point.recovered || 0) : "Limited";
    }
    return formatCompact(point?.[metric]);
}

function severity(country) {
    const snapshot = getEconomicSnapshot(country);
    const activeCases = snapshot.point.hasRecoveredHistory ? snapshot.point.active : 0;
    if (activeCases > 2000000) return { text: "High Active Burden", color: "#ff667f" };
    if (snapshot.shockVs2019 <= -8) return { text: "Severe Contraction", color: "#ff667f" };
    if (snapshot.shockVs2019 <= -4) return { text: "High Stress", color: "#ffb56d" };
    if (snapshot.recoveryVs2020 >= 5) return { text: "Fast Rebound", color: "#ffcb74" };
    return { text: "Moderate Impact", color: "#8ff6cc" };
}

function getLeadCountry() {
    if (state.lockedCountryIso) {
        return state.countries.find((item) => item.iso3 === state.lockedCountryIso) || state.selectedCountry || state.countries[0] || null;
    }
    if (state.selectedTimeIndex === 0) {
        return state.countries.find((item) => item.iso3 === "CHN") || state.countries[0] || null;
    }
    const ranked = [...state.countries]
        .map((item) => ({ item, point: getTimePoint(item, state.selectedTimeIndex) }))
        .filter(({ point }) => point.supportQuality === "strong" && (point.active ?? 0) > 0)
        .sort((a, b) => b.point.exposure - a.point.exposure)
        .map(({ item }) => item);

    return ranked[0] || state.selectedCountry || state.countries[0] || null;
}

function formatGrowth(value) {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function getEconomicSnapshot(country) {
    const point = getTimePoint(country, state.selectedTimeIndex);
    const shockVs2019 = point.gdp - country.gdp2019;
    const recoveryVs2020 = state.selectedTimeIndex === 0 ? 0 : point.gdp - country.gdp2020;

    return {
        point,
        shockVs2019,
        recoveryVs2020
    };
}

function getEconomicDisplay(country) {
    const selectedMeta = getSelectedDayMeta(state.selectedTimeIndex);
    const series = country.economicSeries || { frequency: "annual", points: [] };

    if (series.frequency === "quarterly") {
        const quarter = Math.floor(selectedMeta.month / 3) + 1;
        const points = [1, 2, 3, 4].map((q) => {
            const key = `${selectedMeta.year}-Q${q}`;
            return {
                key,
                label: `Q${q}`,
                value: series.lookup.get(key),
                active: q === quarter
            };
        }).filter((entry) => Number.isFinite(entry.value));

        return {
            frequency: "quarterly",
            label: "Quarterly GDP Path",
            note: `${country.name} uses official OECD quarterly GDP growth data for ${selectedMeta.year}.`,
            chipLabel: `Quarterly / ${selectedMeta.year}`,
            points
        };
    }

    if (series.frequency === "monthly") {
        const points = MONTH_LABELS.map((label, month) => {
            const key = `${selectedMeta.year}-${String(month + 1).padStart(2, "0")}`;
            return {
                key,
                label,
                value: series.lookup.get(key),
                active: month === selectedMeta.month
            };
        }).filter((entry) => Number.isFinite(entry.value));

        return {
            frequency: "monthly",
            label: "Monthly GDP Path",
            note: `${country.name} uses official monthly GDP data for ${selectedMeta.year}.`,
            chipLabel: `Monthly / ${selectedMeta.year}`,
            points
        };
    }

    return {
        frequency: "annual",
        label: "Annual GDP Path",
        note: `No official monthly or quarterly GDP series is loaded for ${country.name}. Showing annual World Bank growth instead.`,
        chipLabel: "Annual only",
        points: series.points.map((entry) => ({
            key: entry.key,
            label: entry.label,
            value: entry.value,
            active: entry.year === selectedMeta.year
        }))
    };
}

function updateEconomicPanel(country) {
    if (!country) {
        return;
    }
    const snapshot = getEconomicSnapshot(country);
    const display = getEconomicDisplay(country);
    const scaleMax = Math.max(8, ...display.points.map((entry) => Math.abs(entry.value)));
    dom.chartLabel.textContent = display.label;
    dom.chartCountry.textContent = display.note;
    dom.barChart.className = `bar-chart ${display.frequency}`;
    dom.barChart.style.setProperty("--bar-count", String(display.points.length || 1));
    dom.barChart.innerHTML = display.points.map((entry) => {
        const height = Math.max(8, (Math.abs(entry.value) / scaleMax) * 100);
        const color = entry.value < 0 ? "#ff718b" : entry.active ? "#ffaa70" : "#72dfff";
        const valueColor = entry.value < 0 ? "#ff9fb0" : "#dff8ff";
        return `
            <div class="bar-col${entry.active ? " active" : ""}">
                <div class="bar-track">
                    <div class="bar-fill" style="height:${height}%;background:${color};opacity:${entry.active ? 1 : 0.82};"></div>
                </div>
                <div class="bar-year">${entry.label}</div>
                <div class="bar-value" style="color:${valueColor}">${formatGrowth(entry.value)}</div>
            </div>
        `;
    }).join("");

    const shockStrength = Math.max(0, Math.min(100, ((snapshot.shockVs2019 + 12) / 24) * 100));
    dom.impactFill.style.width = `${shockStrength}%`;
    dom.shockChip.textContent = `${display.chipLabel} / vs 2019 ${formatSigned(snapshot.shockVs2019)} / vs 2020 ${formatSigned(snapshot.recoveryVs2020)}`;
}

function updateSummary() {
    const label = getSelectedLabel(state.selectedTimeIndex);
    if (state.selectedTimeIndex === 0) {
        dom.avgShock.textContent = "0.0pp";
        dom.avgRecovery.textContent = "0.0pp";
        dom.focusMarket.textContent = "Wuhan, China";
        dom.focusMarketNote.textContent = "Earliest documented cluster / 27 active cases";
        dom.tickerText.textContent = `${label} anchors the timeline to the earliest documented Wuhan cluster before broad global diffusion begins.`;
        return;
    }
    const avgShock = state.countries.reduce((sum, item) => sum + getEconomicSnapshot(item).shockVs2019, 0) / Math.max(1, state.countries.length);
    const avgRecovery = state.countries.reduce((sum, item) => sum + getEconomicSnapshot(item).recoveryVs2020, 0) / Math.max(1, state.countries.length);
    const ranked = [...state.countries]
        .map((item) => ({ item, point: getTimePoint(item, state.selectedTimeIndex) }))
        .filter(({ point }) => point.supportQuality === "strong" && (point.active ?? 0) > 0)
        .sort((a, b) => b.point.exposure - a.point.exposure)
        .map(({ item }) => item);

    dom.avgShock.textContent = formatSigned(avgShock);
    dom.avgRecovery.textContent = formatSigned(avgRecovery);

    if (!ranked.length) {
        dom.focusMarket.textContent = "--";
        dom.focusMarketNote.textContent = `${label} is still in the early pandemic phase`;
        dom.tickerText.textContent = `${label} remains an early stage snapshot, with limited spread and mostly baseline geographic activity on the globe.`;
        return;
    }

    const focus = ranked[0];
    const focusPoint = getTimePoint(focus, state.selectedTimeIndex);
    const focusEconomic = getEconomicSnapshot(focus);
    dom.focusMarket.textContent = focus.name;
    dom.focusMarketNote.textContent = `${formatCaseMetric(focusPoint, "active")} active / ${formatSigned(focusEconomic.shockVs2019)} vs 2019`;
    dom.tickerText.textContent = ranked.slice(0, 8).map((item) => {
        const point = getTimePoint(item, state.selectedTimeIndex);
        const economic = getEconomicSnapshot(item);
        return `${item.name} ${label} active ${formatCaseMetric(point, "active")} recovered ${formatCaseMetric(point, "recovered")} vs2019 ${formatSigned(economic.shockVs2019)} vs2020 ${formatSigned(economic.recoveryVs2020)}`;
    }).join("  •  ");
}

function selectCountry(country) {
    if (!country) {
        return;
    }
    state.selectedCountry = country;
    const level = severity(country);
    const snapshot = getEconomicSnapshot(country);
    const { point, shockVs2019, recoveryVs2020 } = snapshot;
    dom.countryName.textContent = country.name;
    dom.impactBadge.textContent = level.text;
    dom.impactBadge.style.color = level.color;
    dom.activeCasesValue.textContent = formatCaseMetric(point, "active");
    dom.casesValue.textContent = formatCompact(point.totalCases ?? point.cases);
    dom.recoveredValue.textContent = formatCaseMetric(point, "recovered");
    dom.deathsValue.textContent = formatCompact(point.deaths);
    dom.shockValue.textContent = formatSigned(shockVs2019);
    dom.recoveryValue.textContent = formatSigned(recoveryVs2020);
    updateEconomicPanel(country);
    if (state.selectedTimeIndex === 0 && country.iso3 === "CHN") {
        dom.detailNote.textContent =
            `${getSelectedLabel(state.selectedTimeIndex)} is treated as the opening stage of the earliest documented cluster in Wuhan, China. ` +
            `The globe starts from that origin signal and only later expands into broad global spread and visible economic shock.`;
        return;
    }
    if (!point.hasRecoveredHistory) {
        dom.detailNote.textContent =
            `${getSelectedLabel(state.selectedTimeIndex)} sits in the "${point.phaseLabel}" phase. This market has recorded case and death history, ` +
            `but its recovered series is limited, so the globe only shows a weak support signal instead of a full active-case trajectory. ` +
            `The economic panel still reports ${point.gdp.toFixed(1)}% growth, ${formatSigned(shockVs2019)} versus 2019, and ${formatSigned(recoveryVs2020)} versus 2020.`;
        return;
    }

    dom.detailNote.textContent =
        `${getSelectedLabel(state.selectedTimeIndex)} sits in the "${point.phaseLabel}" phase. The market shows about ${formatCompact(point.active)} active cases, ` +
        `${formatCompact(point.recovered || 0)} recovered cases, and ${point.gdp.toFixed(1)}% GDP growth on the current ${country.economicSeries.frequency} path, ` +
        `${formatSigned(shockVs2019)} versus the 2019 baseline and ${formatSigned(recoveryVs2020)} versus the 2020 trough.`;
}

function hideTooltip() {
    dom.tooltip.style.display = "none";
}

function showTooltip(country, sx, sy) {
    const snapshot = getEconomicSnapshot(country);
    const { point, shockVs2019, recoveryVs2020 } = snapshot;
    dom.tooltip.style.display = "block";
    const tooltipLeft = Math.max(348, Math.min(window.innerWidth * 0.28, 430));
    dom.tooltip.style.left = `${tooltipLeft}px`;
    dom.tooltip.style.top = `${Math.max(168, Math.min(window.innerHeight - 200, sy - 72))}px`;
    dom.tooltip.innerHTML = `
        <div style="font-weight:700;color:#68e4ff;margin-bottom:6px;">${country.name}</div>
        <div>Time: <span style="color:#ffd27f">${getSelectedLabel(state.selectedTimeIndex)}</span></div>
        <div>Active cases: <span style="color:#8feeff">${formatCaseMetric(point, "active")}</span></div>
        <div>Recovered: <span style="color:#8ff6cc">${formatCaseMetric(point, "recovered")}</span></div>
        <div>GDP vs 2019: <span style="color:#ff8097">${formatSigned(shockVs2019)}</span></div>
        <div>Recovery vs 2020: <span style="color:#ffd27f">${formatSigned(recoveryVs2020)}</span></div>
    `;
}

function handleCountryHover(country, sx, sy) {
    if (state.lockedCountryIso) {
        return;
    }
    if (!country) {
        hideTooltip();
        return;
    }
    selectCountry(country);
    showTooltip(country, sx, sy);
}

function handleCountryClick(country, sx, sy) {
    if (!country) {
        state.lockedCountryIso = null;
        globe.setLockedCountry(null);
        globe.focusCountry(null);
        hideTooltip();
        selectCountry(getLeadCountry());
        return;
    }

    state.lockedCountryIso = country.iso3;
    globe.setLockedCountry(country.iso3);
    globe.focusCountry(country.iso3);
    selectCountry(country);
    showTooltip(country, sx, sy);
}

function populateCountryFilter() {
    dom.countryOptions.innerHTML = state.countries
        .map((country) => `<option value="${country.name}"></option>`)
        .join("");
}

function jumpToCountrySelection() {
    const query = String(dom.countrySearch.value || "").trim().toLowerCase();
    if (!query) {
        return;
    }
    const country = state.countries.find((item) => item.name.toLowerCase() === query)
        || state.countries.find((item) => item.name.toLowerCase().includes(query));
    if (!country) {
        setStatus(`No country match found for "${dom.countrySearch.value}".`);
        return;
    }
    state.lockedCountryIso = country.iso3;
    globe.setLockedCountry(country.iso3);
    globe.focusCountry(country.iso3);
    selectCountry(country);
    showTooltip(country, 0, window.innerHeight * 0.48);
    setStatus(`Focused ${country.name}. The globe is locked and the country remains active while you scrub the timeline.`);
}

function renderTimelineRuler() {
    const totalSteps = Math.max(1, TIMELINE_DAYS.length - 1);
    const ticks = [];

    TIMELINE_DAYS.forEach((item, index) => {
        const isStart = index === 0;
        const isYearStart = item.month === 0 && item.day === 1;
        const isQuarterStart = (item.month === 0 || item.month === 3 || item.month === 6 || item.month === 9) && item.day === 1;
        const isEnd = index === totalSteps;

        if (!(isStart || isYearStart || isQuarterStart || isEnd)) {
            return;
        }

        const percent = (index / totalSteps) * 100;
        ticks.push(`<span class="timeline-tick${isStart || isYearStart || isEnd ? " major" : ""}" style="left:${percent}%"></span>`);
    });

    dom.timelineRuler.innerHTML = ticks.join("");
}

function updateTimelineUI() {
    dom.timelineSlider.max = String(TIMELINE_DAYS.length - 1);
    dom.timelineSlider.value = String(state.selectedTimeIndex);
    dom.timelineValue.textContent = getSelectedLabel(state.selectedTimeIndex);
    dom.timelineOrigin.textContent = state.selectedTimeIndex === 0
        ? "Origin signal: Wuhan, China"
        : "Origin signal anchored at Dec 2019";
    const totalSteps = Math.max(1, TIMELINE_DAYS.length - 1);
    const anchors = [
        0,
        TIMELINE_DAYS.findIndex((item) => item.year === 2020 && item.month === 0 && item.day === 1),
        TIMELINE_DAYS.findIndex((item) => item.year === 2021 && item.month === 0 && item.day === 1),
        TIMELINE_DAYS.findIndex((item) => item.year === 2022 && item.month === 0 && item.day === 1),
        totalSteps
    ];
    const currentRatio = state.selectedTimeIndex / totalSteps;
    const currentPercent = currentRatio * 100;
    dom.timelineProgress.style.width = `${currentPercent}%`;
    dom.timelineThumb.style.left = `${currentPercent}%`;

    const pointNodes = [...dom.timelinePoints.children];
    const placedPercents = [];
    const minVisualGap = 7.2;

    pointNodes.forEach((node, index) => {
        const anchor = anchors[index] >= 0 ? anchors[index] : 0;
        const anchorRatio = anchor / totalSteps;
        const actualPercent = anchorRatio * 100;
        const previousPlaced = index > 0 ? placedPercents[index - 1] : -Infinity;
        const percent = index > 0 && actualPercent - previousPlaced < minVisualGap
            ? previousPlaced + minVisualGap
            : actualPercent;
        node.style.left = `${Math.min(100, percent)}%`;
        node.classList.remove("crowded-upper", "crowded-lower");
        node.classList.toggle("is-start", index === 0);
        node.classList.toggle("is-end", index === dom.timelinePoints.children.length - 1);
        node.classList.toggle("active", state.selectedTimeIndex >= anchor);
        placedPercents.push(percent);
    });

    pointNodes.forEach((node, index) => {
        if (index === 0) {
            return;
        }
        const previousPercent = placedPercents[index - 1];
        const currentPercent = placedPercents[index];
        if (Math.abs(currentPercent - previousPercent) < 8) {
            pointNodes[index - 1].classList.add("crowded-upper");
            node.classList.add("crowded-lower");
        }
    });

    renderTimelineRuler();
}

function syncUrl() {
    const meta = getSelectedDayMeta(state.selectedTimeIndex);
    const url = new URL(window.location.href);
    url.searchParams.set("year", String(meta.year));
    url.searchParams.set("month", String(meta.month + 1));
    url.searchParams.set("day", String(meta.day));
    window.history.replaceState({}, "", url);
}

function applyTimeIndex(timeIndex) {
    state.selectedTimeIndex = Math.max(0, Math.min(TIMELINE_DAYS.length - 1, timeIndex));
    syncUrl();
    updateTimelineUI();
    globe.setTimeIndex(state.selectedTimeIndex);
    updateSummary();
    selectCountry(getLeadCountry());
    if (state.lockedCountryIso) {
        const locked = state.countries.find((item) => item.iso3 === state.lockedCountryIso);
        if (locked) {
            showTooltip(locked, 0, window.innerHeight * 0.48);
            globe.setLockedCountry(locked.iso3);
            globe.focusCountry(locked.iso3);
        }
    }
    setStatus(`Timeline moved to ${getSelectedLabel(state.selectedTimeIndex)}. Inspect pandemic spread and economic conditions day by day.`);
}

function stopPlayback() {
    state.isPlaying = false;
    dom.playToggle.textContent = "Play";
    if (state.playTimer) {
        window.clearInterval(state.playTimer);
        state.playTimer = null;
    }
}

function startPlayback() {
    stopPlayback();
    state.isPlaying = true;
    dom.playToggle.textContent = "Pause";
    state.playTimer = window.setInterval(() => {
        if (state.selectedTimeIndex >= TIMELINE_DAYS.length - 1) {
            stopPlayback();
            return;
        }
        applyTimeIndex(state.selectedTimeIndex + 1);
    }, 42);
}

function bindEvents() {
    dom.timelineSlider.addEventListener("input", () => {
        applyTimeIndex(Number(dom.timelineSlider.value) || 0);
    });

    dom.playToggle.addEventListener("click", () => {
        if (state.isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    });

    dom.jumpStart.addEventListener("click", () => {
        stopPlayback();
        applyTimeIndex(0);
    });

    dom.countryJump.addEventListener("click", () => {
        stopPlayback();
        jumpToCountrySelection();
    });

    dom.countrySearch.addEventListener("change", () => {
        stopPlayback();
        jumpToCountrySelection();
    });

    window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            if (state.isPlaying) {
                stopPlayback();
            } else {
                startPlayback();
            }
        }
        if (event.code === "ArrowRight") {
            applyTimeIndex(state.selectedTimeIndex + 1);
        }
        if (event.code === "ArrowLeft") {
            applyTimeIndex(state.selectedTimeIndex - 1);
        }
    });
}

async function hydrateHistoriesInBackground() {
    setStatus("Site is usable. Hydrating country histories in the background...");

    let historyLookup = null;
    try {
        historyLookup = await loadAllCountryHistories();
    } catch (error) {
        console.warn("Falling back to per-country history requests", error);
        const historyTargets = state.countries;
        const histories = await Promise.all(
            historyTargets.map((country) =>
                loadCountryHistory(country.name)
                    .then((timeline) => ({ iso3: country.iso3, timeline }))
                    .catch(() => ({ iso3: country.iso3, timeline: null }))
            )
        );
        historyLookup = new Map(
            histories
                .filter((entry) => entry.timeline)
                .map((entry) => [entry.iso3, entry.timeline])
        );
    }

    state.countries = state.countries.map((country) => {
        const history = historyLookup.get?.(country.iso3) || resolveHistoryFromMap(historyLookup, country.name);
        const timeline = buildCountryTimeline(
            {
                cases: country.cases,
                active: country.active,
                recovered: country.recovered,
                deaths: country.deaths,
                population: country.population
            },
            {
                y2019: country.gdp2019,
                y2020: country.gdp2020,
                y2021: country.gdp2021,
                y2022: country.gdp2022,
                y2023: country.gdp2023
            },
            history,
            country.economicSeries
        );

        return {
            ...country,
            timeline,
            historySupport: timeline.__support?.supportQuality || "weak"
        };
    });

    globe.setCountries(state.countries);
    updateSummary();
    selectCountry(getLeadCountry());
    if (state.lockedCountryIso) {
        globe.setLockedCountry(state.lockedCountryIso);
    }
    globe.setTimeIndex(state.selectedTimeIndex);
    setStatus("Site ready. Drag or play the daily timeline to inspect country-level pandemic and economic change.");
}

async function init() {
    bindEvents();
    updateTimelineUI();
    setLoading(true);
    setStatus("Loading world geometry and economic data...");

    let features = null;
    let covidRows = fallbackCovid;
    let gdpMap = fallbackGdp;
    let quarterlyGdpMap = {};

    const results = await Promise.allSettled([
        loadWorldFeatures(),
        loadCovidRows(),
        loadGdpMap(),
        loadOecdQuarterlyGdpMap()
    ]);

    const sources = [];

    if (results[0].status === "fulfilled") {
        features = results[0].value;
        sources.push("world-atlas (live)");
    } else {
        console.error(results[0].reason);
        sources.push("world-atlas (missing)");
    }

    if (results[1].status === "fulfilled") {
        covidRows = results[1].value;
        sources.push("disease.sh (live)");
    } else {
        console.error(results[1].reason);
        sources.push("disease.sh (fallback)");
    }

    if (results[2].status === "fulfilled") {
        gdpMap = results[2].value;
        sources.push("World Bank (live)");
    } else {
        console.error(results[2].reason);
        sources.push("World Bank (fallback)");
    }

    if (results[3].status === "fulfilled") {
        quarterlyGdpMap = results[3].value;
        sources.push("OECD quarterly GDP (live)");
    } else {
        console.error(results[3].reason);
        quarterlyGdpMap = {};
        sources.push("OECD quarterly GDP (unavailable)");
    }

    state.sourceSummary = sources.join(" + ");

    dom.sourceNote.textContent = `Sources: ${state.sourceSummary}. Case layers use recovered-aware active trajectories when reliable and downgrade to weak support when recovered history is limited. GDP charts use official OECD quarterly data where available and annual World Bank growth otherwise.`;

    if (features) {
        globe.setFeatures(features);
    }

    setStatus("Building the first view...");
    state.countries = normalizeCountries(covidRows, gdpMap, quarterlyGdpMap);
    populateCountryFilter();

    globe.setCountries(state.countries);
    updateSummary();
    applyTimeIndex(state.selectedTimeIndex);
    selectCountry(getLeadCountry());
    setStatus("Initial view ready. Loading deeper historical series...");
    setLoading(false);
    void hydrateHistoriesInBackground();
}

init().catch((error) => {
    console.error(error);
    stopPlayback();
    setStatus("Initialization failed. Automatic flow stopped.");
    dom.sourceNote.textContent = "Initialization failed. Check network access or retry with fallback data.";
    setLoading(false);
});
