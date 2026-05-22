# 3D Globe Prototype File Classification

This file classifies the main COVID Economic Globe prototype files by HTML, CSS, and JavaScript responsibility.

## Main 3D Globe Prototype

### HTML

| File | Role |
|---|---|
| `index.html` | Main page entry. Defines the 3D globe stage, HUD panels, search panel, country detail panel, comparison panel, timeline controls, 2D dashboard view, tooltip, and AI explanation panel. It loads `assets/styles/main.css` and starts the app through `src/app.js`. |

Key HTML areas inside `index.html`:

| Area | Element / Section | Purpose |
|---|---|---|
| 3D globe container | `#stage` | WebGL rendering target for the Three.js globe. |
| Mode switching | `#modeToggle` | Switches between the 3D globe and 2D dashboard mode. |
| Global HUD | `.hud` | Contains title, search, metrics, focus panel, comparison panel, methodology, dock, and timeline. |
| Country search | `#countrySearch`, `#countrySearchInput`, `#countrySearchResults` | Lets users search country or ISO code. |
| Country detail | `#countryName`, `#casesValue`, `#shockValue`, `#deathsValue`, `#recoveryValue` | Shows selected or hovered country data. |
| Comparison panel | `#comparePanel` | Supports two-country comparison. |
| Timeline panel | `#timelineSlider`, `#playToggle`, `#timelineValue` | Controls date/time progression. |
| 2D dashboard | `#dashboardView` | Static dashboard alternative using the same loaded dataset. |
| AI explanation tool | `#aiGuide` | UI container for contextual AI explanation. |

### CSS

| File | Role |
|---|---|
| `assets/styles/main.css` | Main visual styling for the entire prototype. It styles the full-screen WebGL stage, HUD layout, panels, search, cards, timeline, comparison panel, dashboard mode, tooltip, loading overlay, AI explanation tool, and responsive behaviour. |

Key CSS responsibilities:

| Area | Main selectors | Purpose |
|---|---|---|
| Global visual system | `:root`, `html`, `body`, `body::before` | Defines colour variables, background, typography, and full-screen layout. |
| Globe stage | `#stage`, `#stage:active` | Makes the WebGL globe full-screen and gives it grab/grabbing interaction cursors. |
| Dashboard switch | `.mode-toggle`, `body.dashboard-mode` | Styles the 3D/2D mode toggle and hides the globe HUD when dashboard mode is active. |
| HUD panels | `.hero`, `.search-panel`, `.focus`, `.methodology`, `.chip`, `.dock`, `.timeline-panel`, `.compare-panel` | Defines floating information panels. |
| Timeline | `.timeline-panel`, `.timeline-slider`, `.timeline-points` | Styles the time control UI. |
| Comparison | `.compare-panel`, `.compare-slot`, `.compare-metrics` | Styles two-region comparison UI. |
| 2D dashboard | `.dashboard-view`, `.dashboard-shell`, `.dashboard-card`, `.dashboard-bars`, `.dashboard-ranking` | Styles the alternative dashboard view. |
| AI tool | `.ai-guide`, `.ai-guide-panel`, `.ai-guide-messages`, `.ai-guide-form` | Styles the explanation assistant. |

### JavaScript

| File | Role |
|---|---|
| `src/app.js` | Main application controller. Imports all modules, initializes the globe, loads data, handles state, country focus, search, comparison, dashboard mode, timeline updates, and AI assistant context. |
| `src/globe.js` | Core 3D globe renderer. Uses Three.js to create the scene, camera, renderer, globe sphere, atmosphere, stars, country boundaries, land/case clusters, hover/click picking, auto-rotation, drag rotation, resize handling, and time-based visual updates. |
| `src/data.js` | Data loading layer. Fetches world boundaries, COVID data, World Bank GDP data, and historical COVID timelines; includes fallback data. |
| `src/timeline.js` | Timeline model. Builds daily timeline points from 2019 to 2023 and calculates country-level time-point values such as cases, deaths, GDP, shock, recovery, and exposure. |
| `src/format.js` | Formatting helpers for compact numbers and signed values. |
| `src/ai-assistant.js` | AI explanation tool logic. Opens/closes the AI panel, sends questions to `/api/explain`, and provides fallback explanations for GDP shock, recovery, causation, sources, and selected country data. |
| `src/research-tool.js` | Embedded research survey tool. Defines and renders the prototype feedback questionnaire, stores responses locally, and exports survey JSON. |
| `server.js` | Local Node server. Serves the static prototype and provides the `/api/explain` endpoint used by the AI explanation tool. |

Important JavaScript flow:

1. `index.html` loads `src/app.js`.
2. `app.js` calls `createGlobe()` from `src/globe.js`.
3. `app.js` loads world, COVID, GDP, and historical data through `src/data.js`.
4. `app.js` normalizes the country data and passes it into the globe.
5. `globe.js` renders countries and clusters, then updates visuals when the timeline changes.
6. `timeline.js` provides date labels and time-point values.
7. `app.js` updates HUD panels, comparison mode, dashboard mode, and AI assistant context.

## Duplicate / Newer Copy

There is also a duplicated or newer copy under:

`covid-economic-globe - newone/`

Its structure is similar, but it contains extra map-related modules:

| File | Category | Role |
|---|---|---|
| `covid-economic-globe - newone/index.html` | HTML | Entry page for the copied/newer version. |
| `covid-economic-globe - newone/assets/styles/main.css` | CSS | Styling for the copied/newer version. |
| `covid-economic-globe - newone/src/globe.js` | JavaScript | 3D globe rendering logic. |
| `covid-economic-globe - newone/src/app.js` | JavaScript | Main application controller. |
| `covid-economic-globe - newone/src/map2d.js` | JavaScript | 2D map view logic. |
| `covid-economic-globe - newone/src/choropleth.js` | JavaScript | Choropleth map visual encoding. |
| `covid-economic-globe - newone/src/world-geo.js` | JavaScript | World geography helper data or logic. |
| `covid-economic-globe - newone/src/data.js` | JavaScript | Data loading. |
| `covid-economic-globe - newone/src/timeline.js` | JavaScript | Timeline calculations. |
| `covid-economic-globe - newone/src/format.js` | JavaScript | Formatting helpers. |
| `covid-economic-globe - newone/src/ai-assistant.js` | JavaScript | AI explanation panel logic. |
| `covid-economic-globe - newone/src/research-tool.js` | JavaScript | Embedded research survey. |

## Other Prototype Directions

These files are not part of the main 3D globe prototype, but belong to other prototype directions or testing materials:

| Path | Category | Notes |
|---|---|---|
| `prototype-policy-V2/index.html` | HTML | Policy-maker game prototype entry. |
| `prototype-policy-V2/css/style.css` | CSS | Styling for policy-maker game prototype. |
| `prototype-policy-V2/js/*.js` | JavaScript | Game/simulation/world map logic for policy-maker prototype. |
| `Zhuoding Liu/prototype.html` | HTML | Another teammate prototype. |
| `results.html` | HTML | Survey/result display page. |
| `survey_questions.html` | HTML | Survey question page. |
| `survey_result.md` | Markdown | Teammate survey result data. |

