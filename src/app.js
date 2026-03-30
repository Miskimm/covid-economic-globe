import { fallbackCovid, fallbackGdp, loadCountryHistory, loadCovidRows, loadGdpMap, loadWorldFeatures } from "./data.js";
import { formatCompact, formatSigned } from "./format.js";
import { createGlobe } from "./globe.js";
import { buildCountryTimeline, getInitialTimeIndex, getSelectedDayMeta, getSelectedLabel, getTimePoint, TIMELINE_DAYS, TIMELINE_YEARS } from "./timeline.js";

const config = {
    minPopulation: 250000,
    historyCountryCount: 72
};

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
    casesValue: document.getElementById("casesValue"),
    deathsValue: document.getElementById("deathsValue"),
    shockValue: document.getElementById("shockValue"),
    recoveryValue: document.getElementById("recoveryValue"),
    detailNote: document.getElementById("detailNote"),
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
    chartCountry: document.getElementById("chartCountry"),
    shockChip: document.getElementById("shockChip"),
    impactFill: document.getElementById("impactFill"),
    bar2019: document.getElementById("bar2019"),
    bar2020: document.getElementById("bar2020"),
    bar2021: document.getElementById("bar2021"),
    bar2022: document.getElementById("bar2022"),
    bar2023: document.getElementById("bar2023"),
    bar2019Value: document.getElementById("bar2019Value"),
    bar2020Value: document.getElementById("bar2020Value"),
    bar2021Value: document.getElementById("bar2021Value"),
    bar2022Value: document.getElementById("bar2022Value"),
    bar2023Value: document.getElementById("bar2023Value")
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
            chinaRow.population += Number(row.population || 0);
            continue;
        }

        result.push(row);
    }

    return result;
}

function normalizeCountries(covidRows, gdpMap) {
    return consolidateCovidRows(covidRows)
        .map((row) => {
            const gdp = gdpMap[row.iso3];
            if (!row.iso3 || !gdp || !Number.isFinite(row.lat) || !Number.isFinite(row.lng) || row.population < config.minPopulation) {
                return null;
            }
            const shock = gdp.y2020 - gdp.y2019;
            const recovery = gdp.y2023 - gdp.y2020;
            const casesPerMillion = (row.cases / row.population) * 1000000;
            const exposure = Math.log10(casesPerMillion + 10) * Math.max(0.7, Math.min(14, Math.abs(Math.min(0, shock))));
            return {
                name: row.name || row.country,
                iso3: row.iso3,
                lat: row.lat,
                lng: row.lng,
                cases: row.cases,
                deaths: row.deaths,
                population: row.population,
                gdp2019: gdp.y2019,
                gdp2020: gdp.y2020,
                gdp2021: gdp.y2021,
                gdp2022: gdp.y2022,
                gdp2023: gdp.y2023,
                shock,
                recovery,
                exposure,
                timeline: buildCountryTimeline(row, gdp)
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.exposure - a.exposure);
}

function severity(country) {
    const snapshot = getEconomicSnapshot(country);
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
        .filter((item) => getTimePoint(item, state.selectedTimeIndex).cases > 0)
        .sort((a, b) => getTimePoint(b, state.selectedTimeIndex).exposure - getTimePoint(a, state.selectedTimeIndex).exposure);

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

function updateEconomicPanel(country) {
    if (!country) {
        return;
    }
    const snapshot = getEconomicSnapshot(country);

    const values = [
        { key: "bar2019", valueKey: "bar2019Value", value: country.gdp2019, color: "#6ee6ff" },
        { key: "bar2020", valueKey: "bar2020Value", value: country.gdp2020, color: "#ff6b84" },
        { key: "bar2021", valueKey: "bar2021Value", value: country.gdp2021, color: "#ffaa70" },
        { key: "bar2022", valueKey: "bar2022Value", value: country.gdp2022, color: "#8fd4ff" },
        { key: "bar2023", valueKey: "bar2023Value", value: country.gdp2023, color: "#ffd27f" }
    ];

    const scaleMax = Math.max(8, ...values.map((entry) => Math.abs(entry.value)));
    values.forEach((entry) => {
        const height = Math.max(8, (Math.abs(entry.value) / scaleMax) * 100);
        dom[entry.key].style.height = `${height}%`;
        dom[entry.key].style.background = entry.color;
        dom[entry.key].style.opacity = entry.value === 0 ? "0.4" : "1";
        dom[entry.valueKey].textContent = formatGrowth(entry.value);
        dom[entry.valueKey].style.color = entry.value < 0 ? "#ff829a" : "#dff8ff";
    });

    const shockStrength = Math.max(0, Math.min(100, ((snapshot.shockVs2019 + 12) / 24) * 100));
    dom.impactFill.style.width = `${shockStrength}%`;
    dom.shockChip.textContent = `vs 2019 ${formatSigned(snapshot.shockVs2019)} / vs 2020 ${formatSigned(snapshot.recoveryVs2020)}`;
    dom.chartCountry.textContent = `${country.name} GDP growth path, current gap vs 2019, and rebound vs 2020`;
}

function updateSummary() {
    const label = getSelectedLabel(state.selectedTimeIndex);
    if (state.selectedTimeIndex === 0) {
        dom.avgShock.textContent = "0.0pp";
        dom.avgRecovery.textContent = "0.0pp";
        dom.focusMarket.textContent = "Wuhan, China";
        dom.focusMarketNote.textContent = "Earliest documented cluster / 27 cases";
        dom.tickerText.textContent = `${label} is used as the opening day of the timeline, anchored to the earliest documented cluster in Wuhan before wider global diffusion begins.`;
        return;
    }
    const avgShock = state.countries.reduce((sum, item) => sum + getEconomicSnapshot(item).shockVs2019, 0) / Math.max(1, state.countries.length);
    const avgRecovery = state.countries.reduce((sum, item) => sum + getEconomicSnapshot(item).recoveryVs2020, 0) / Math.max(1, state.countries.length);
    const ranked = [...state.countries]
        .filter((item) => getTimePoint(item, state.selectedTimeIndex).cases > 0)
        .sort((a, b) => getTimePoint(b, state.selectedTimeIndex).exposure - getTimePoint(a, state.selectedTimeIndex).exposure);

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
    dom.focusMarketNote.textContent = `${formatCompact(focusPoint.cases)} cases / ${formatSigned(focusEconomic.shockVs2019)} vs 2019`;
    dom.tickerText.textContent = ranked.slice(0, 8).map((item) => {
        const point = getTimePoint(item, state.selectedTimeIndex);
        const economic = getEconomicSnapshot(item);
        return `${item.name} ${label} cases ${formatCompact(point.cases)} vs2019 ${formatSigned(economic.shockVs2019)} vs2020 ${formatSigned(economic.recoveryVs2020)}`;
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
    dom.casesValue.textContent = formatCompact(point.cases);
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
    dom.detailNote.textContent =
        `${getSelectedLabel(state.selectedTimeIndex)} sits in the "${point.phaseLabel}" phase. The market shows about ${formatCompact(point.cases)} cumulative cases, ` +
        `${point.gdp.toFixed(1)}% GDP growth on the mapped annual path, ${formatSigned(shockVs2019)} versus the 2019 baseline, and ${formatSigned(recoveryVs2020)} versus the 2020 trough.`;
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
        <div>Total cases: <span style="color:#8feeff">${formatCompact(point.cases)}</span></div>
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
        hideTooltip();
        selectCountry(getLeadCountry());
        return;
    }

    state.lockedCountryIso = country.iso3;
    globe.setLockedCountry(country.iso3);
    selectCountry(country);
    showTooltip(country, sx, sy);
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

    [...dom.timelinePoints.children].forEach((node, index) => {
        const anchor = anchors[index] >= 0 ? anchors[index] : 0;
        const anchorRatio = anchor / totalSteps;
        const percent = anchorRatio * 100;
        node.style.left = `${percent}%`;
        node.classList.toggle("is-start", index === 0);
        node.classList.toggle("is-end", index === dom.timelinePoints.children.length - 1);
        node.classList.toggle("active", state.selectedTimeIndex >= anchor);
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

    const historyTargets = state.countries.slice(0, config.historyCountryCount);
    const histories = await Promise.all(
        historyTargets.map((country) =>
            loadCountryHistory(country.name)
                .then((timeline) => ({ iso3: country.iso3, timeline }))
                .catch(() => ({ iso3: country.iso3, timeline: null }))
        )
    );

    const historyMap = Object.fromEntries(histories.map((entry) => [entry.iso3, entry.timeline]));
    state.countries = state.countries.map((country) => ({
        ...country,
        timeline: buildCountryTimeline(
            {
                cases: country.cases,
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
            historyMap[country.iso3]
        )
    }));

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

    try {
        [features, covidRows, gdpMap] = await Promise.all([
            loadWorldFeatures(),
            loadCovidRows(),
            loadGdpMap()
        ]);
        state.sourceSummary = "world-atlas + disease.sh + World Bank";
    } catch (error) {
        console.error(error);
        state.sourceSummary = "local fallback dataset";
    }

    dom.sourceNote.textContent = `Sources: ${state.sourceSummary}. This site can run locally and automatically falls back if live APIs fail.`;

    if (features) {
        globe.setFeatures(features);
    }

    setStatus("Building the first view...");
    state.countries = normalizeCountries(covidRows, gdpMap);

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
