import { fallbackCovid, fallbackGdp, loadCountryHistory, loadCovidRows, loadGdpMap, loadWorldFeatures } from "./data.js";
import { formatCompact, formatSigned } from "./format.js";
import { createGlobe } from "./globe.js";
import { buildCountryTimeline, getInitialTimeIndex, getSelectedDayMeta, getSelectedLabel, getTimePoint, TIMELINE_DAYS, TIMELINE_YEARS } from "./timeline.js";
import { initResearchTool } from "./research-tool.js";
import { initAiAssistant } from "./ai-assistant.js";

const config = {
    minPopulation: 250000,
    historyCountryCount: 72
};

const dom = {
    stage: document.getElementById("stage"),
    modeToggle: document.getElementById("modeToggle"),
    dashboardView: document.getElementById("dashboardView"),
    dashboardSubtitle: document.getElementById("dashboardSubtitle"),
    dashboardDate: document.getElementById("dashboardDate"),
    dashboardAvgShock: document.getElementById("dashboardAvgShock"),
    dashboardAvgRecovery: document.getElementById("dashboardAvgRecovery"),
    dashboardFocusMarket: document.getElementById("dashboardFocusMarket"),
    dashboardFocusPhase: document.getElementById("dashboardFocusPhase"),
    dashboardCountry: document.getElementById("dashboardCountry"),
    dashboardImpactPill: document.getElementById("dashboardImpactPill"),
    dashboardCases: document.getElementById("dashboardCases"),
    dashboardDeaths: document.getElementById("dashboardDeaths"),
    dashboardShock: document.getElementById("dashboardShock"),
    dashboardRecovery: document.getElementById("dashboardRecovery"),
    dashboardFocusNote: document.getElementById("dashboardFocusNote"),
    dashboardChartTitle: document.getElementById("dashboardChartTitle"),
    dashboardBars: document.getElementById("dashboardBars"),
    dashboardRanking: document.getElementById("dashboardRanking"),
    dashboardSource: document.getElementById("dashboardSource"),
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
    bar2023Value: document.getElementById("bar2023Value"),
    countrySearch: document.getElementById("countrySearch"),
    countrySearchInput: document.getElementById("countrySearchInput"),
    countrySearchResults: document.getElementById("countrySearchResults")
};

const state = {
    countries: [],
    selectedCountry: null,
    lockedCountryIso: null,
    selectedTimeIndex: getInitialTimeIndex(window.location.search),
    viewMode: "globe",
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
    if (country.shock <= -8) return { text: "Severe Contraction", color: "#ff667f" };
    if (country.shock <= -4) return { text: "High Stress", color: "#ffb56d" };
    if (country.recovery >= 5) return { text: "Fast Rebound", color: "#ffcb74" };
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

function getAverageMetrics() {
    const count = Math.max(1, state.countries.length);
    return {
        shock: state.countries.reduce((sum, item) => sum + item.shock, 0) / count,
        recovery: state.countries.reduce((sum, item) => sum + item.recovery, 0) / count
    };
}

function getRankedCountries() {
    return [...state.countries]
        .filter((item) => getTimePoint(item, state.selectedTimeIndex).cases > 0)
        .sort((a, b) => getTimePoint(b, state.selectedTimeIndex).exposure - getTimePoint(a, state.selectedTimeIndex).exposure);
}

function setViewMode(mode) {
    state.viewMode = mode === "dashboard" ? "dashboard" : "globe";
    const isDashboard = state.viewMode === "dashboard";
    document.body.classList.toggle("dashboard-mode", isDashboard);
    dom.dashboardView.hidden = !isDashboard;
    dom.modeToggle.textContent = isDashboard ? "Back to 3D Globe" : "Switch to 2D Dashboard";
    dom.modeToggle.setAttribute("aria-pressed", String(isDashboard));
    hideTooltip();
    updateDashboard();
}

function renderDashboardBars(country) {
    dom.dashboardBars.innerHTML = "";
    if (!country) {
        return;
    }

    const values = [
        { year: "2019", value: country.gdp2019, color: "#6ee6ff" },
        { year: "2020", value: country.gdp2020, color: "#ff6b84" },
        { year: "2021", value: country.gdp2021, color: "#ffaa70" },
        { year: "2022", value: country.gdp2022, color: "#8fd4ff" },
        { year: "2023", value: country.gdp2023, color: "#ffd27f" }
    ];
    const scaleMax = Math.max(8, ...values.map((entry) => Math.abs(entry.value)));

    values.forEach((entry) => {
        const item = document.createElement("div");
        const track = document.createElement("div");
        const fill = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("strong");

        item.className = "dashboard-bar-item";
        track.className = "dashboard-bar-track";
        fill.className = "dashboard-bar-fill";
        label.textContent = entry.year;
        value.textContent = formatGrowth(entry.value);
        value.style.color = entry.value < 0 ? "#ff829a" : "#dff8ff";
        fill.style.height = `${Math.max(10, (Math.abs(entry.value) / scaleMax) * 100)}%`;
        fill.style.background = entry.color;
        track.appendChild(fill);
        item.append(track, label, value);
        dom.dashboardBars.appendChild(item);
    });
}

function renderDashboardRanking() {
    dom.dashboardRanking.innerHTML = "";
    const ranked = getRankedCountries().slice(0, 8);

    if (!ranked.length) {
        const empty = document.createElement("div");
        empty.className = "dashboard-empty";
        empty.textContent = "No ranked country activity for this date yet.";
        dom.dashboardRanking.appendChild(empty);
        return;
    }

    const maxExposure = Math.max(1, ...ranked.map((country) => getTimePoint(country, state.selectedTimeIndex).exposure));
    ranked.forEach((country, index) => {
        const point = getTimePoint(country, state.selectedTimeIndex);
        const row = document.createElement("button");
        const rank = document.createElement("span");
        const name = document.createElement("strong");
        const meta = document.createElement("small");
        const bar = document.createElement("i");

        row.className = "dashboard-rank-row";
        row.type = "button";
        row.dataset.iso3 = country.iso3;
        rank.textContent = String(index + 1).padStart(2, "0");
        name.textContent = country.name;
        meta.textContent = `${formatCompact(point.cases)} cases / shock ${formatSigned(country.shock)}`;
        bar.style.width = `${Math.max(8, (point.exposure / maxExposure) * 100)}%`;
        row.append(rank, name, meta, bar);
        dom.dashboardRanking.appendChild(row);
    });
}

function updateDashboard() {
    if (!dom.dashboardView || !state.countries.length) {
        return;
    }

    const country = state.selectedCountry || getLeadCountry();
    if (!country) {
        return;
    }

    const point = getTimePoint(country, state.selectedTimeIndex);
    const level = severity(country);
    const averages = getAverageMetrics();

    dom.dashboardDate.textContent = getSelectedLabel(state.selectedTimeIndex);
    dom.dashboardSubtitle.textContent = `${country.name} is shown as the current static dashboard focus.`;
    dom.dashboardAvgShock.textContent = formatSigned(averages.shock);
    dom.dashboardAvgRecovery.textContent = formatSigned(averages.recovery);
    dom.dashboardFocusMarket.textContent = country.name;
    dom.dashboardFocusPhase.textContent = point.phaseLabel;
    dom.dashboardCountry.textContent = country.name;
    dom.dashboardImpactPill.textContent = level.text;
    dom.dashboardImpactPill.style.color = level.color;
    dom.dashboardCases.textContent = formatCompact(point.cases);
    dom.dashboardDeaths.textContent = formatCompact(point.deaths);
    dom.dashboardShock.textContent = formatSigned(country.shock);
    dom.dashboardRecovery.textContent = formatSigned(country.recovery);
    dom.dashboardChartTitle.textContent = `${country.name} annual GDP growth path`;
    dom.dashboardFocusNote.textContent =
        `${getSelectedLabel(state.selectedTimeIndex)} is in the "${point.phaseLabel}" phase, with ${formatCompact(point.cases)} cumulative cases, ` +
        `${formatCompact(point.deaths)} deaths, ${point.gdp.toFixed(1)}% mapped GDP growth, and a 2019 to 2020 shock of ${formatSigned(country.shock)}.`;
    dom.dashboardSource.textContent = `Sources: ${state.sourceSummary}. Dashboard mode is a static 2D prototype view using the same loaded dataset.`;

    renderDashboardBars(country);
    renderDashboardRanking();
}

function normalizeSearch(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function getCountrySearchMatches(query) {
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) {
        return [];
    }

    return state.countries
        .map((country) => {
            const name = normalizeSearch(country.name);
            const iso = String(country.iso3 || "").toLowerCase();
            let score = 0;

            if (iso === normalizedQuery) score = 100;
            else if (name === normalizedQuery) score = 96;
            else if (name.startsWith(normalizedQuery)) score = 82;
            else if (iso.startsWith(normalizedQuery)) score = 76;
            else if (name.includes(normalizedQuery)) score = 56;

            return { country, score };
        })
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.country.name.localeCompare(b.country.name))
        .slice(0, 8)
        .map((entry) => entry.country);
}

function setSearchResultsVisible(isVisible) {
    dom.countrySearchResults.hidden = !isVisible;
    dom.countrySearchInput.setAttribute("aria-expanded", String(isVisible));
}

function renderSearchResults(matches, query) {
    dom.countrySearchResults.innerHTML = "";

    if (!query.trim()) {
        setSearchResultsVisible(false);
        return;
    }

    if (!matches.length) {
        const empty = document.createElement("div");
        empty.className = "search-empty";
        empty.textContent = "No country found in the current dataset.";
        dom.countrySearchResults.appendChild(empty);
        setSearchResultsVisible(true);
        return;
    }

    matches.forEach((country) => {
        const point = getTimePoint(country, state.selectedTimeIndex);
        const option = document.createElement("button");
        const label = document.createElement("span");
        const name = document.createElement("strong");
        const meta = document.createElement("small");
        const shock = document.createElement("em");

        option.className = "search-option";
        option.type = "button";
        option.setAttribute("role", "option");
        option.dataset.iso3 = country.iso3;
        name.textContent = country.name;
        meta.textContent = `${country.iso3} / ${formatCompact(point.cases)} cases / ${formatCompact(point.deaths)} deaths`;
        shock.textContent = formatSigned(country.shock);
        label.append(name, meta);
        option.append(label, shock);
        dom.countrySearchResults.appendChild(option);
    });

    setSearchResultsVisible(true);
}

function selectCountryFromSearch(country) {
    if (!country) {
        return;
    }

    stopPlayback();
    state.lockedCountryIso = country.iso3;
    state.selectedCountry = country;
    globe.setLockedCountry(country.iso3);
    selectCountry(country);
    showTooltip(country, 0, window.innerHeight * 0.48);
    dom.countrySearchInput.value = country.name;
    setSearchResultsVisible(false);
    setStatus(`Showing detailed COVID and GDP data for ${country.name} at ${getSelectedLabel(state.selectedTimeIndex)}.`);
}

function submitCountrySearch() {
    const matches = getCountrySearchMatches(dom.countrySearchInput.value);
    if (!matches.length) {
        renderSearchResults(matches, dom.countrySearchInput.value);
        setStatus("No matching country found. Try a country name or ISO code such as AUS, CHN, or USA.");
        return;
    }
    selectCountryFromSearch(matches[0]);
}

function updateEconomicPanel(country) {
    if (!country) {
        return;
    }

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

    const shockStrength = Math.max(0, Math.min(100, ((country.shock + 12) / 24) * 100));
    dom.impactFill.style.width = `${shockStrength}%`;
    dom.shockChip.textContent = `Shock ${formatSigned(country.shock)} / Recovery ${formatSigned(country.recovery)}`;
    dom.chartCountry.textContent = `${country.name} GDP growth path and post-pandemic rebound`;
}

function updateSummary() {
    const label = getSelectedLabel(state.selectedTimeIndex);
    if (state.selectedTimeIndex === 0) {
        dom.avgShock.textContent = "0.0pp";
        dom.avgRecovery.textContent = "0.0pp";
        dom.focusMarket.textContent = "Wuhan, China";
        dom.focusMarketNote.textContent = "Earliest documented cluster / 27 cases";
        dom.tickerText.textContent = `${label} is used as the opening day of the timeline, anchored to the earliest documented cluster in Wuhan before wider global diffusion begins.`;
        updateDashboard();
        return;
    }
    const { shock: avgShock, recovery: avgRecovery } = getAverageMetrics();
    const ranked = getRankedCountries();

    dom.avgShock.textContent = formatSigned(avgShock);
    dom.avgRecovery.textContent = formatSigned(avgRecovery);

    if (!ranked.length) {
        dom.focusMarket.textContent = "--";
        dom.focusMarketNote.textContent = `${label} is still in the early pandemic phase`;
        dom.tickerText.textContent = `${label} remains an early stage snapshot, with limited spread and mostly baseline geographic activity on the globe.`;
        updateDashboard();
        return;
    }

    const focus = ranked[0];
    const focusPoint = getTimePoint(focus, state.selectedTimeIndex);
    dom.focusMarket.textContent = focus.name;
    dom.focusMarketNote.textContent = `${formatCompact(focusPoint.cases)} cases / ${formatSigned(focus.shock)} GDP shock`;
    dom.tickerText.textContent = ranked.slice(0, 8).map((item) => {
        const point = getTimePoint(item, state.selectedTimeIndex);
        return `${item.name} ${label} cases ${formatCompact(point.cases)} shock ${formatSigned(item.shock)} recovery ${formatSigned(item.recovery)}`;
    }).join("  •  ");
    updateDashboard();
}

function selectCountry(country) {
    if (!country) {
        return;
    }
    state.selectedCountry = country;
    const level = severity(country);
    const point = getTimePoint(country, state.selectedTimeIndex);
    dom.countryName.textContent = country.name;
    dom.impactBadge.textContent = level.text;
    dom.impactBadge.style.color = level.color;
    dom.casesValue.textContent = formatCompact(point.cases);
    dom.deathsValue.textContent = formatCompact(point.deaths);
    dom.shockValue.textContent = formatSigned(country.shock);
    dom.recoveryValue.textContent = formatSigned(country.recovery);
    updateEconomicPanel(country);
    if (state.selectedTimeIndex === 0 && country.iso3 === "CHN") {
        dom.detailNote.textContent =
            `${getSelectedLabel(state.selectedTimeIndex)} is treated as the opening stage of the earliest documented cluster in Wuhan, China. ` +
            `The globe starts from that origin signal and only later expands into broad global spread and visible economic shock.`;
        updateDashboard();
        return;
    }
    dom.detailNote.textContent =
        `${getSelectedLabel(state.selectedTimeIndex)} sits in the "${point.phaseLabel}" phase. The market shows about ${formatCompact(point.cases)} cumulative cases, ` +
        `${point.gdp.toFixed(1)}% GDP growth on the mapped annual path, a 2019 to 2020 shock of ${formatSigned(country.shock)}, and a 2020 to 2023 recovery gap of ${formatSigned(country.recovery)}.`;
    updateDashboard();
}

function hideTooltip() {
    dom.tooltip.style.display = "none";
}

function showTooltip(country, sx, sy) {
    if (state.viewMode === "dashboard") {
        return;
    }
    const point = getTimePoint(country, state.selectedTimeIndex);
    dom.tooltip.style.display = "block";
    const tooltipLeft = Math.max(348, Math.min(window.innerWidth * 0.28, 430));
    dom.tooltip.style.left = `${tooltipLeft}px`;
    dom.tooltip.style.top = `${Math.max(168, Math.min(window.innerHeight - 200, sy - 72))}px`;
    dom.tooltip.innerHTML = `
        <div style="font-weight:700;color:#68e4ff;margin-bottom:6px;">${country.name}</div>
        <div>Time: <span style="color:#ffd27f">${getSelectedLabel(state.selectedTimeIndex)}</span></div>
        <div>Total cases: <span style="color:#8feeff">${formatCompact(point.cases)}</span></div>
        <div>GDP shock: <span style="color:#ff8097">${formatSigned(country.shock)}</span></div>
        <div>Recovery: <span style="color:#ffd27f">${formatSigned(country.recovery)}</span></div>
    `;
}

function handleCountryHover(country, sx, sy) {
    if (state.viewMode === "dashboard") {
        return;
    }
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
    if (state.viewMode === "dashboard") {
        return;
    }
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

function updateTimelineUI() {
    dom.timelineSlider.max = String(TIMELINE_DAYS.length - 1);
    dom.timelineSlider.value = String(state.selectedTimeIndex);
    dom.timelineValue.textContent = getSelectedLabel(state.selectedTimeIndex);
    const selected = getSelectedDayMeta(state.selectedTimeIndex);
    dom.timelineOrigin.textContent = state.selectedTimeIndex === 0
        ? "Origin signal: Wuhan, China"
        : "Origin signal anchored at Dec 2019";
    [...dom.timelinePoints.children].forEach((node, index) => {
        node.classList.toggle("active", TIMELINE_YEARS[index] === selected.year);
    });
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
    dom.modeToggle.addEventListener("click", () => {
        setViewMode(state.viewMode === "dashboard" ? "globe" : "dashboard");
    });

    dom.countrySearch.addEventListener("submit", (event) => {
        event.preventDefault();
        submitCountrySearch();
    });

    dom.countrySearchInput.addEventListener("input", () => {
        renderSearchResults(getCountrySearchMatches(dom.countrySearchInput.value), dom.countrySearchInput.value);
    });

    dom.countrySearchInput.addEventListener("focus", () => {
        renderSearchResults(getCountrySearchMatches(dom.countrySearchInput.value), dom.countrySearchInput.value);
    });

    dom.countrySearchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            dom.countrySearchInput.blur();
            setSearchResultsVisible(false);
        }
    });

    dom.countrySearchResults.addEventListener("click", (event) => {
        const option = event.target.closest(".search-option");
        if (!option) {
            return;
        }
        const country = state.countries.find((item) => item.iso3 === option.dataset.iso3);
        selectCountryFromSearch(country);
    });

    dom.dashboardRanking.addEventListener("click", (event) => {
        const option = event.target.closest(".dashboard-rank-row");
        if (!option) {
            return;
        }
        const country = state.countries.find((item) => item.iso3 === option.dataset.iso3);
        if (!country) {
            return;
        }
        state.lockedCountryIso = country.iso3;
        state.selectedCountry = country;
        globe.setLockedCountry(country.iso3);
        selectCountry(country);
        setStatus(`Dashboard focus changed to ${country.name} at ${getSelectedLabel(state.selectedTimeIndex)}.`);
    });

    document.addEventListener("pointerdown", (event) => {
        if (!dom.countrySearch.contains(event.target)) {
            setSearchResultsVisible(false);
        }
    });

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
        const target = event.target;
        const isTypingTarget = target instanceof HTMLElement && (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable
        );
        if (isTypingTarget) {
            return;
        }

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

function getAssistantContext() {
    const country = state.selectedCountry || getLeadCountry();
    const point = country ? getTimePoint(country, state.selectedTimeIndex) : null;
    return {
        selectedLabel: getSelectedLabel(state.selectedTimeIndex),
        sourceSummary: state.sourceSummary,
        country: country ? {
            name: country.name,
            iso3: country.iso3,
            cases: country.cases,
            deaths: country.deaths,
            shock: country.shock,
            recovery: country.recovery,
            gdp2019: country.gdp2019,
            gdp2020: country.gdp2020,
            gdp2021: country.gdp2021,
            gdp2022: country.gdp2022,
            gdp2023: country.gdp2023
        } : null,
        point: point ? {
            cases: point.cases,
            deaths: point.deaths,
            gdp: point.gdp,
            shock: point.shock,
            recovery: point.recovery,
            phaseLabel: point.phaseLabel
        } : null
    };
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

initResearchTool();
initAiAssistant({ getContext: getAssistantContext });
