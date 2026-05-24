import { fallbackCovid, fallbackGdp, loadCountryHistory, loadCovidRows, loadGdpMap, loadWorldFeatures } from "./data.js";
import { formatCompact, formatSigned } from "./format.js";
import { createGlobe } from "./globe.js?v=pause-rotation-1";
import { createMap2d } from "./map2d.js";
import { buildCountryTimeline, getInitialTimeIndex, getSelectedDayMeta, getSelectedLabel, getTimePoint, TIMELINE_DAYS, TIMELINE_YEARS } from "./timeline.js";
import { initAiAssistant } from "./ai-assistant.js";

const config = {
    minPopulation: 250000,
    historyCountryCount: 72
};

const dom = {
    stage: document.getElementById("stage"),
    map2dView: document.getElementById("map2dView"),
    mapCanvas: document.getElementById("mapCanvas"),
    zoomControls: document.querySelector(".zoom-controls"),
    zoomIn: document.getElementById("zoomIn"),
    zoomOut: document.getElementById("zoomOut"),
    zoomReset: document.getElementById("zoomReset"),
    rotationToggle: document.getElementById("rotationToggle"),
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
    healthTrendValue: document.getElementById("healthTrendValue"),
    economicTrendValue: document.getElementById("economicTrendValue"),
    healthTrendSvg: document.getElementById("healthTrendSvg"),
    economicTrendSvg: document.getElementById("economicTrendSvg"),
    healthTrendEvent: document.getElementById("healthTrendEvent"),
    economicTrendEvent: document.getElementById("economicTrendEvent"),
    tickerText: document.getElementById("tickerText"),
    timelineSlider: document.getElementById("timelineSlider"),
    timelineValue: document.getElementById("timelineValue"),
    timelineOrigin: document.getElementById("timelineOrigin"),
    timelinePoints: document.getElementById("timelinePoints"),
    playToggle: document.getElementById("playToggle"),
    jumpStart: document.getElementById("jumpStart"),
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
    countrySearchResults: document.getElementById("countrySearchResults"),
    sourcePanel: document.getElementById("sourcePanel"),
    sourceStatusBadge: document.getElementById("sourceStatusBadge"),
    sourceAccessDate: document.getElementById("sourceAccessDate"),
    sourceList: document.getElementById("sourceList"),
    sourceLimitations: document.getElementById("sourceLimitations")
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

const map2d = createMap2d(dom.mapCanvas, {
    onSelect: handleCountryClick,
    onHover: handleCountryHover
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
        return state.selectedCountry || state.countries[0] || null;
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

function syncMapView() {
    map2d.setCountries(state.countries);
    map2d.setTimeIndex(state.selectedTimeIndex);
    map2d.setSelected(state.lockedCountryIso || state.selectedCountry?.iso3 || null);
}

function getRankedCountries() {
    return [...state.countries]
        .filter((item) => getTimePoint(item, state.selectedTimeIndex).cases > 0)
        .sort((a, b) => getTimePoint(b, state.selectedTimeIndex).exposure - getTimePoint(a, state.selectedTimeIndex).exposure);
}

function setViewMode(mode) {
    state.viewMode = mode === "map2d" ? "map2d" : "globe";
    const isMap2d = state.viewMode === "map2d";
    document.body.classList.toggle("map-mode", isMap2d);
    document.body.classList.remove("dashboard-mode");
    dom.map2dView.hidden = !isMap2d;
    dom.dashboardView.hidden = true;
    dom.modeToggle.textContent = isMap2d ? "Back to 3D Globe" : "Switch to 2D Map";
    dom.modeToggle.setAttribute("aria-pressed", String(isMap2d));
    hideTooltip();
    syncMapView();
    if (isMap2d) {
        requestAnimationFrame(() => map2d.resize());
    }
}

function getActiveMapController() {
    return state.viewMode === "map2d" ? map2d : globe;
}

function renderRotationToggle() {
    const isRotating = globe.isAutoRotating();
    dom.rotationToggle.textContent = isRotating ? "Pause" : "Resume";
    dom.rotationToggle.setAttribute("aria-pressed", String(!isRotating));
    dom.rotationToggle.setAttribute("aria-label", isRotating ? "Pause globe rotation" : "Resume globe rotation");
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
        const economic = document.createElement("em");

        option.className = "search-option";
        option.type = "button";
        option.setAttribute("role", "option");
        option.dataset.iso3 = country.iso3;
        name.textContent = country.name;
        meta.textContent = `${country.iso3} / ${formatCompact(point.cases)} cases`;
        economic.textContent = `GDP ${point.gdp.toFixed(1)}%`;
        label.append(name, meta);
        option.append(label, economic);
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
    map2d.setSelected(country.iso3);
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

function createSvgElement(tagName, attrs = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    Object.entries(attrs).forEach(([key, value]) => {
        element.setAttribute(key, String(value));
    });
    return element;
}

function getTrendSamples(country, valueAccessor, transform = (value) => value) {
    const step = 30;
    const selected = state.selectedTimeIndex;
    const indices = new Set([0, selected, TIMELINE_DAYS.length - 1]);
    for (let index = 0; index < TIMELINE_DAYS.length; index += step) {
        indices.add(index);
    }

    return [...indices]
        .sort((a, b) => a - b)
        .map((index) => {
            const point = getTimePoint(country, index);
            const raw = valueAccessor(point);
            return {
                index,
                raw,
                value: transform(raw),
                point
            };
        })
        .filter((item) => Number.isFinite(item.value));
}

function makeTrendEvent({ label, title, body, sourceLabel, sourceUrl, sourceTitle, sourceSnippet }) {
    return {
        label,
        title,
        body,
        sourceLabel,
        sourceUrl,
        sourceTitle: sourceTitle || title,
        sourceSnippet: sourceSnippet || body
    };
}

function getSourceHost(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return url;
    }
}

function getTrendContext(country, meta) {
    if (meta.year < 2020 || (meta.year === 2020 && meta.month === 0 && meta.day < 20)) {
        return {
            health: makeTrendEvent({
                label: "Early outbreak context",
                title: "Wuhan pneumonia cluster under investigation",
                body: "At this point, the case line is still close to the baseline because the outbreak was being identified and investigated. News reports described dozens of pneumonia cases in Wuhan and uncertainty about the cause, which helps explain why early data may look small but still matters.",
                sourceLabel: "BBC News, Jan 2020",
                sourceUrl: "https://www.bbc.co.uk/news/world-asia-china-50984025",
                sourceTitle: "China pneumonia outbreak: Mystery virus probed in Wuhan",
                sourceSnippet: "Chinese authorities investigated a mysterious viral pneumonia in Wuhan, with dozens of confirmed cases reported in early January."
            }),
            economic: makeTrendEvent({
                label: "Pre-shock economy",
                title: "Economic impact not yet visible in annual GDP",
                body: "The GDP line has not yet dropped because the economic indicator is annual and slower-moving. This is a reminder that health events can appear in daily case data before their economic impact becomes visible in GDP figures.",
                sourceLabel: "WHO outbreak news",
                sourceUrl: "https://www.who.int/emergencies/disease-outbreak-news/item/2020-DON229"
            })
        };
    }

    if (country?.iso3 === "CHN") {
        if (meta.year === 2020 && meta.month <= 1) {
            return {
                health: makeTrendEvent({
                    label: "Outbreak spread",
                    title: "Cases spread beyond Wuhan",
                    body: "Around this period, reports described the number of confirmed infections rising and cases appearing in Beijing, Shanghai and overseas. On the chart, a steeper case line means reported infections were accumulating faster, not simply that one event caused all later cases.",
                    sourceLabel: "BBC News, Jan 2020",
                    sourceUrl: "https://www.bbc.com/news/world-asia-china-51171035",
                    sourceTitle: "New China virus: Cases triple as infection spreads",
                    sourceSnippet: "Confirmed infections rose sharply, with cases reported beyond Wuhan in Beijing, Shanghai and overseas."
                }),
                economic: makeTrendEvent({
                    label: "Lockdown shock",
                    title: "Wuhan lockdown disrupted movement and spending",
                    body: "Wuhan and other Hubei cities restricted trains, flights, public transport and gatherings. This gives context for later GDP decline: mobility, retail, tourism and services were disrupted, but the chart still shows association and timing, not direct single-cause proof.",
                    sourceLabel: "BBC News, Jan 2020",
                    sourceUrl: "https://www.bbc.com/news/world-asia-china-51217455",
                    sourceTitle: "China coronavirus: Lockdown measures rise across Hubei",
                    sourceSnippet: "Wuhan's trains, planes and public transport were stopped as lockdown measures expanded across Hubei province."
                })
            };
        }

        if (meta.year === 2020 && meta.month <= 5) {
            return {
                health: makeTrendEvent({
                    label: "Containment period",
                    title: "Transmission control changed the case trajectory",
                    body: "After the initial outbreak and strict controls, the case trend should be read together with testing, reporting and containment policy. A flatter line may indicate slower reported growth, but it can also reflect changes in reporting scope and data collection.",
                    sourceLabel: "WHO timeline",
                    sourceUrl: "https://www.who.int/news/item/27-04-2020-who-timeline---covid-19"
                }),
                economic: makeTrendEvent({
                    label: "GDP contraction",
                    title: "China's economy contracted in Q1 2020",
                    body: "Reuters reported that China's GDP fell 6.8% year-on-year in Q1 2020 as lockdowns disrupted production and spending. This helps users connect the low point in the GDP line with real economic activity such as factories, consumption and jobs.",
                    sourceLabel: "Reuters via The Straits Times",
                    sourceUrl: "https://www.straitstimes.com/business/economy/coronavirus-chinas-economy-shrank-68-in-q1-first-contraction-in-decades",
                    sourceTitle: "Coronavirus: China's economy shrank 6.8% in Q1",
                    sourceSnippet: "Reuters reported China's first quarterly contraction in decades as the outbreak paralysed production and spending."
                })
            };
        }

        if (meta.year === 2021) {
            return {
                health: makeTrendEvent({
                    label: "Renewed outbreak risk",
                    title: "Local outbreaks and control measures continued",
                    body: "The case line may look lower or flatter than many countries, but it should be read with China's strict containment approach and reporting context. The important interpretation is not only the number, but how policy shaped what appears in the data.",
                    sourceLabel: "WHO COVID-19 dashboard",
                    sourceUrl: "https://data.who.int/dashboards/covid19/cases"
                }),
                economic: makeTrendEvent({
                    label: "Rebound phase",
                    title: "Recovery reflects reopening and base effects",
                    body: "A rebound in GDP growth after the 2020 trough can partly reflect resumed production and comparison with a very weak 2020 baseline. It should be read as economic rebound, not as proof that health conditions were fully recovered.",
                    sourceLabel: "World Bank GDP data",
                    sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG"
                })
            };
        }

        if (meta.year === 2022) {
            return {
                health: makeTrendEvent({
                    label: "Zero-COVID pressure",
                    title: "Large-scale restrictions returned in some cities",
                    body: "During 2022, outbreaks and strict controls again shaped daily life and reporting. The case line should be interpreted with policy context because restrictions can affect both transmission and how cases are detected.",
                    sourceLabel: "BBC News, Shanghai lockdown",
                    sourceUrl: "https://www.bbc.com/news/world-asia-china-60994022"
                }),
                economic: makeTrendEvent({
                    label: "Service disruption",
                    title: "Restrictions affected consumption and services",
                    body: "If the GDP line weakens or fails to rebound strongly, one likely context is disruption to mobility, shopping, restaurants, tourism and service work. This event note is a mockup explanation linking data to real-world economic channels.",
                    sourceLabel: "World Bank GDP data",
                    sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG"
                })
            };
        }

        return {
            health: makeTrendEvent({
                label: "Post-reopening context",
                title: "Interpreting cases after policy changes",
                body: "By this stage, case data should be read carefully because testing behaviour, reporting practice and public policy may have changed. The trend still gives useful context, but it cannot fully represent the lived scale of illness by itself.",
                sourceLabel: "WHO outbreak news",
                sourceUrl: "https://www.who.int/emergencies/disease-outbreak-news/item/2020-DON229"
            }),
            economic: makeTrendEvent({
                label: "Recovery context",
                title: "GDP growth reflects recovery, not health recovery",
                body: "A stronger GDP value after the trough can show economic reopening and rebound. It does not mean the pandemic had no ongoing effects, so users should still compare policy, consumption, tourism and labour-market context.",
                sourceLabel: "World Bank GDP data",
                sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG"
            })
        };
    }

    if (meta.year === 2020) {
        return {
            health: makeTrendEvent({
            label: "Pandemic phase",
            title: "COVID became a global pandemic",
                body: "For this selected time, the case line should be read with the global outbreak context. Rapid growth may reflect real transmission, but also testing capacity, reporting delays and differences between countries.",
            sourceLabel: "WHO timeline",
            sourceUrl: "https://www.who.int/news/item/27-04-2020-who-timeline---covid-19"
            }),
            economic: makeTrendEvent({
            label: "Global shock",
            title: "Global economic shock",
                body: "GDP movement in 2020 should be interpreted with lockdowns, demand changes, tourism decline, trade disruption and industry structure. The line shows economic movement, not direct causation from cases alone.",
            sourceLabel: "IMF World Economic Outlook",
            sourceUrl: "https://www.imf.org/en/Publications/WEO/Issues/2020/04/14/weo-april-2020"
            })
        };
    }

    return {
        health: makeTrendEvent({
            label: "Context note",
            title: "Cases need local context",
            body: "This mockup note shows how the interface can connect the selected time to relevant public-health context. For a full version, each country would use local outbreak reports, testing policy and public-health announcements.",
            sourceLabel: "WHO COVID-19 dashboard",
            sourceUrl: "https://data.who.int/dashboards/covid19/cases"
        }),
        economic: makeTrendEvent({
            label: "Context note",
            title: "GDP needs policy and industry context",
            body: "This mockup note shows how the interface can explain the selected GDP point through local restrictions, tourism, trade, labour markets and sector structure. It helps users avoid reading the line as a simple cause-effect claim.",
            sourceLabel: "World Bank GDP data",
            sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG"
        })
    };
}

function renderTrendEvent(target, event) {
    if (!target || !event) {
        return;
    }

    target.innerHTML = `
        <div class="trend-event-k">${getSelectedLabel(state.selectedTimeIndex)} / ${event.label}</div>
        <strong>${event.title}</strong>
        <p>${event.body}</p>
        <a class="trend-source-card" href="${event.sourceUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open source: ${event.sourceTitle}">
            <span class="trend-source-icon">${event.sourceLabel.slice(0, 1)}</span>
            <span class="trend-source-content">
                <span class="trend-source-name">${event.sourceLabel}</span>
                <span class="trend-source-url">${getSourceHost(event.sourceUrl)}</span>
                <span class="trend-source-title">${event.sourceTitle}</span>
                <span class="trend-source-snippet">${event.sourceSnippet}</span>
            </span>
        </a>
    `;
}

function renderTrendLine(svg, country, options) {
    if (!svg || !country) {
        return;
    }

    const {
        className,
        valueAccessor,
        transform,
        currentLabel,
        areaColor
    } = options;
    const width = 260;
    const height = 92;
    const pad = { left: 12, right: 12, top: 12, bottom: 18 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;
    const samples = getTrendSamples(country, valueAccessor, transform);
    svg.innerHTML = "";

    if (samples.length < 2) {
        svg.append(createSvgElement("text", {
            x: 12,
            y: 46,
            class: "trend-axis-label"
        }));
        svg.lastChild.textContent = "Not enough trend data";
        return;
    }

    const values = samples.map((item) => item.value);
    let min = Math.min(...values);
    let max = Math.max(...values);
    if (Math.abs(max - min) < 0.001) {
        min -= 1;
        max += 1;
    }
    const padding = (max - min) * 0.12;
    min -= padding;
    max += padding;

    const xScale = (index) => pad.left + (index / Math.max(1, TIMELINE_DAYS.length - 1)) * plotW;
    const yScale = (value) => pad.top + (1 - ((value - min) / (max - min))) * plotH;
    const points = samples.map((item) => ({
        ...item,
        x: xScale(item.index),
        y: yScale(item.value)
    }));
    const linePath = points.map((item, index) => `${index === 0 ? "M" : "L"} ${item.x.toFixed(2)} ${item.y.toFixed(2)}`).join(" ");
    const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${height - pad.bottom} L ${points[0].x.toFixed(2)} ${height - pad.bottom} Z`;

    [0.25, 0.5, 0.75].forEach((ratio) => {
        const y = pad.top + ratio * plotH;
        svg.append(createSvgElement("line", {
            x1: pad.left,
            y1: y,
            x2: width - pad.right,
            y2: y,
            class: "trend-grid-line"
        }));
    });

    svg.append(createSvgElement("path", {
        d: areaPath,
        fill: areaColor,
        class: "trend-area"
    }));
    svg.append(createSvgElement("path", {
        d: linePath,
        class: `trend-line ${className}`
    }));

    const currentPoint = getTimePoint(country, state.selectedTimeIndex);
    const currentValue = transform(valueAccessor(currentPoint));
    if (Number.isFinite(currentValue)) {
        svg.append(createSvgElement("line", {
            x1: xScale(state.selectedTimeIndex),
            y1: pad.top,
            x2: xScale(state.selectedTimeIndex),
            y2: height - pad.bottom,
            class: `trend-current-line ${className}`
        }));
        svg.append(createSvgElement("circle", {
            cx: xScale(state.selectedTimeIndex),
            cy: yScale(currentValue),
            r: 4,
            class: `trend-current-dot ${className}`
        }));
    }

    const startLabel = createSvgElement("text", {
        x: pad.left,
        y: height - 3,
        class: "trend-axis-label"
    });
    startLabel.textContent = "2019";
    const endLabel = createSvgElement("text", {
        x: width - pad.right,
        y: height - 3,
        "text-anchor": "end",
        class: "trend-axis-label"
    });
    endLabel.textContent = "2023";
    const valueLabel = createSvgElement("text", {
        x: width - pad.right,
        y: 10,
        "text-anchor": "end",
        class: "trend-axis-label"
    });
    valueLabel.textContent = currentLabel(currentPoint);
    svg.append(startLabel, endLabel, valueLabel);
}

function updateFocusTrends(country, point) {
    const context = getTrendContext(country, getSelectedDayMeta(state.selectedTimeIndex));
    dom.healthTrendValue.textContent = formatCompact(point.cases);
    dom.economicTrendValue.textContent = `${point.gdp.toFixed(1)}%`;
    renderTrendEvent(dom.healthTrendEvent, context.health);
    renderTrendEvent(dom.economicTrendEvent, context.economic);
    renderTrendLine(dom.healthTrendSvg, country, {
        className: "health",
        valueAccessor: (entry) => entry.cases,
        transform: (value) => Math.log10(Math.max(0, value) + 1),
        currentLabel: (entry) => `${formatCompact(entry.cases)} cases`,
        areaColor: "#68e4ff"
    });
    renderTrendLine(dom.economicTrendSvg, country, {
        className: "economic",
        valueAccessor: (entry) => entry.gdp,
        transform: (value) => value,
        currentLabel: (entry) => `${entry.gdp.toFixed(1)}% GDP`,
        areaColor: "#ffcb74"
    });
}

function updateEconomicPanel(country) {
    if (!country || !dom.impactFill || !dom.shockChip || !dom.chartCountry) {
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
        if (!dom[entry.key] || !dom[entry.valueKey]) {
            return;
        }
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
        dom.focusMarket.textContent = "Timeline start";
        dom.focusMarketNote.textContent = "Low case-intensity baseline";
        dom.tickerText.textContent = `${label} is used as the opening day of the timeline, with a low-intensity baseline before wider global diffusion begins.`;
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
    updateFocusTrends(country, point);
    updateEconomicPanel(country);
    updateDashboard();
}

function hideTooltip() {
    dom.tooltip.style.display = "none";
}

function showTooltip(country, sx, sy) {
    if (!country) {
        return;
    }
    const point = getTimePoint(country, state.selectedTimeIndex);
    dom.tooltip.style.display = "block";
    const tooltipWidth = 260;
    const stageRect = dom.stage.getBoundingClientRect();
    const mapRect = dom.map2dView.getBoundingClientRect();
    const viewRect = state.viewMode === "map2d" && !dom.map2dView.hidden ? mapRect : stageRect;
    const zoomRect = dom.zoomControls?.getBoundingClientRect();
    const safeLeft = Math.max(
        viewRect.left + 18,
        zoomRect ? zoomRect.right + 14 : viewRect.left + 18
    );
    const safeRight = viewRect.right - tooltipWidth - 14;
    const tooltipLeft = state.viewMode === "map2d"
        ? Math.max(safeLeft, Math.min(safeRight, sx + 16))
        : Math.min(safeRight, safeLeft);
    dom.tooltip.style.left = `${tooltipLeft}px`;
    dom.tooltip.style.top = `${Math.max(viewRect.top + 18, Math.min(viewRect.bottom - 206, sy - 72))}px`;
    dom.tooltip.innerHTML = `
        <div style="font-weight:700;color:#68e4ff;margin-bottom:6px;">${country.name}</div>
        <div>Time: <span style="color:#ffd27f">${getSelectedLabel(state.selectedTimeIndex)}</span></div>
        <div style="margin-top:6px;">Health trend: <span style="color:#8feeff">${formatCompact(point.cases)} cases</span></div>
        <div>Economic trend: <span style="color:#ffd27f">${point.gdp.toFixed(1)}% GDP growth</span></div>
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
        map2d.setSelected(null);
        hideTooltip();
        selectCountry(getLeadCountry());
        return;
    }

    state.lockedCountryIso = country.iso3;
    globe.setLockedCountry(country.iso3);
    map2d.setSelected(country.iso3);
    selectCountry(country);
    showTooltip(country, sx, sy);
}

function updateTimelineUI() {
    dom.timelineSlider.max = String(TIMELINE_DAYS.length - 1);
    dom.timelineSlider.value = String(state.selectedTimeIndex);
    const selectedLabel = getSelectedLabel(state.selectedTimeIndex);
    const progress = (state.selectedTimeIndex / Math.max(1, TIMELINE_DAYS.length - 1)) * 100;
    dom.timelineValue.textContent = selectedLabel;
    dom.timelineSlider.setAttribute("aria-valuetext", selectedLabel);
    dom.timelineSlider.style.setProperty("--progress", `${progress}%`);
    const selected = getSelectedDayMeta(state.selectedTimeIndex);
    dom.timelineOrigin.textContent = state.selectedTimeIndex === 0
        ? "Low-intensity baseline"
        : "Timeline anchored at Dec 2019";
    if (dom.timelinePoints?.children?.length) {
        [...dom.timelinePoints.children].forEach((node, index) => {
            node.classList.toggle("active", TIMELINE_YEARS[index] === selected.year);
        });
    }
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
    map2d.setTimeIndex(state.selectedTimeIndex);
    updateSummary();
    selectCountry(getLeadCountry());
    if (state.lockedCountryIso) {
        const locked = state.countries.find((item) => item.iso3 === state.lockedCountryIso);
        if (locked) {
            showTooltip(locked, 0, window.innerHeight * 0.48);
            globe.setLockedCountry(locked.iso3);
            map2d.setSelected(locked.iso3);
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
        setViewMode(state.viewMode === "map2d" ? "globe" : "map2d");
    });

    dom.zoomIn.addEventListener("click", () => {
        getActiveMapController().zoomIn();
    });

    dom.zoomOut.addEventListener("click", () => {
        getActiveMapController().zoomOut();
    });

    dom.zoomReset.addEventListener("click", () => {
        globe.resetZoom();
        map2d.resetZoom();
    });

    dom.rotationToggle.addEventListener("click", () => {
        globe.setAutoRotate(!globe.isAutoRotating());
        renderRotationToggle();
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
        map2d.setSelected(country.iso3);
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
    map2d.setCountries(state.countries);
    updateSummary();
    selectCountry(getLeadCountry());
    if (state.lockedCountryIso) {
        globe.setLockedCountry(state.lockedCountryIso);
        map2d.setSelected(state.lockedCountryIso);
    }
    globe.setTimeIndex(state.selectedTimeIndex);
    map2d.setTimeIndex(state.selectedTimeIndex);
    setStatus("Site ready. Drag or play the daily timeline to inspect country-level pandemic and economic change.");
}

const LIVE_SOURCE_LIST_HTML = `
                            <li><strong>world-atlas v2</strong> — country boundaries (<a href="https://github.com/topojson/world-atlas" target="_blank" rel="noopener noreferrer">TopoJSON</a>, CDN)</li>
                            <li><strong>disease.sh</strong> — COVID-19 cases &amp; deaths by country (<a href="https://disease.sh/docs/" target="_blank" rel="noopener noreferrer">API docs</a>, live when available)</li>
                            <li><strong>World Bank</strong> <code>NY.GDP.MKTP.KD.ZG</code> — annual GDP growth %, 2019–2023 (<a href="https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG" target="_blank" rel="noopener noreferrer">indicator page</a>)</li>`;

const FALLBACK_SOURCE_LIST_HTML = `
                            <li><strong>world-atlas v2</strong> — country boundaries (CDN)</li>
                            <li><strong>Local fallback sample</strong> — 8 countries with bundled COVID and GDP growth values (live APIs unavailable)</li>`;

function updateSourcePanelMetadata(isLive) {
    if (dom.sourceAccessDate) {
        dom.sourceAccessDate.textContent = new Date().toISOString().slice(0, 10);
    }
    if (dom.sourceList) {
        dom.sourceList.innerHTML = isLive ? LIVE_SOURCE_LIST_HTML : FALLBACK_SOURCE_LIST_HTML;
    }
    if (dom.sourceLimitations) {
        const fallbackNote = dom.sourceLimitations.querySelector("[data-fallback-only]");
        if (fallbackNote) {
            fallbackNote.hidden = isLive;
        }
    }
}

async function init() {
    bindEvents();
    renderRotationToggle();
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

    const isLive = state.sourceSummary !== "local fallback dataset";
    if (dom.sourceStatusBadge) {
        dom.sourceStatusBadge.textContent = isLive ? "Live" : "Fallback";
        dom.sourceStatusBadge.className = `source-badge ${isLive ? "live" : "fallback"}`;
    }
    updateSourcePanelMetadata(isLive);

    if (features) {
        globe.setFeatures(features);
        map2d.setFeatures(features);
    }

    setStatus("Building the first view...");
    state.countries = normalizeCountries(covidRows, gdpMap);

    globe.setCountries(state.countries);
    map2d.setCountries(state.countries);
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
    if (dom.sourceStatusBadge) {
        dom.sourceStatusBadge.textContent = "Fallback";
        dom.sourceStatusBadge.className = "source-badge fallback";
    }
    updateSourcePanelMetadata(false);
    setLoading(false);
});

initAiAssistant({ getContext: getAssistantContext });
