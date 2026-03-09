# COVID Economic Globe

A static frontend project that visualizes COVID-19 spread and macroeconomic impact on an interactive 3D globe.

## Structure

- `index.html`: page shell and semantic structure
- `assets/styles/main.css`: global styling and responsive layout
- `src/app.js`: app state, UI updates, timeline, and playback controls
- `src/globe.js`: WebGL globe rendering, borders, clusters, and interaction
- `src/timeline.js`: daily timeline logic and time point generation
- `src/data.js`: live data loading and fallback sample data
- `src/format.js`: number formatting helpers

## Run Locally

Start a static server in this directory, for example:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Current Features

- Daily timeline from `2019-12-01` to `2023-12-31`
- Drag or play the timeline to inspect change over time
- Clear world borders with hover and click-based country highlighting
- Country detail panel linked to cases, deaths, GDP shock, and recovery
- Right-side economic panel showing GDP growth path and recovery pattern
- Automatic fallback to local sample data if live APIs fail

## Data Sources

- `world-atlas`
- `disease.sh`
- `World Bank`

## Next Steps

1. Add country search for faster navigation during demos.
2. Expand detailed historical coverage to more countries.
3. Introduce a build toolchain such as Vite and linting for long-term maintenance.
