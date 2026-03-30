/**
 * Full-screen Leaflet map + Plague Inc.–style red infection dots (demo).
 * Dot count scales with the Infection metric; positions are stylised clusters, not real case locations.
 */

let mapInstance = null;
/** @type {L.LayerGroup|null} */
let overlayLayer = null;

/** Macro regions — dots cluster near these (abstract “population” centres). */
const REGIONS = [
  { name: "Americas (N)", lat: 42, lng: -98, skew: 0.94 },
  { name: "Americas (S)", lat: -12, lng: -58, skew: 1.02 },
  { name: "Europe", lat: 52, lng: 18, skew: 0.98 },
  { name: "Africa", lat: 2, lng: 22, skew: 1.08 },
  { name: "Asia", lat: 38, lng: 98, skew: 1.05 },
  { name: "Oceania", lat: -22, lng: 134, skew: 0.9 },
];

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

/** Deterministic 0–1 “noise” from an index (stable while metrics unchanged). */
function pseudoRandom(seed) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Single 0–100 stress index (sidebar / legend).
 */
export function compositePressure(m) {
  const inf = m.infection ?? 0;
  const death = m.death ?? 0;
  const hc = m.healthcare ?? 50;
  const econ = m.economy ?? 50;
  const pub = m.publicSat ?? 50;
  return clamp(
    0.38 * inf + 0.2 * death + 0.22 * (100 - hc) + 0.12 * (100 - econ) + 0.08 * (100 - pub),
    0,
    100
  );
}

function regionalPressure(r, base) {
  return clamp(base * r.skew + (Math.sin(r.lat * 0.1) + Math.cos(r.lng * 0.05)) * 4, 0, 100);
}

function pickRegionIndex(i, metrics, base) {
  const weights = REGIONS.map((r) => regionalPressure(r, base) + 10);
  const sum = weights.reduce((a, b) => a + b, 0);
  let t = pseudoRandom(i * 9.17 + metrics.infection * 0.37 + base * 0.1) * sum;
  for (let j = 0; j < weights.length; j++) {
    t -= weights[j];
    if (t <= 0) return j;
  }
  return i % REGIONS.length;
}

function dotLatLng(i, metrics, base) {
  const ri = pickRegionIndex(i, metrics, base);
  const r = REGIONS[ri];
  const inf = metrics.infection ?? 0;
  const spreadLat = 5 + (1 - inf / 100) * 12;
  const spreadLng = 10 + (1 - inf / 100) * 16;
  const lat = clamp(
    r.lat + (pseudoRandom(i * 12.9898 + 1) - 0.5) * spreadLat * 2,
    -58,
    72
  );
  const lng = clamp(
    r.lng + (pseudoRandom(i * 78.233 + 2) - 0.5) * spreadLng * 2,
    -179,
    179
  );
  return { lat, lng };
}

export function initWorldMap(containerId) {
  const el = document.getElementById(containerId);
  if (!el || typeof L === "undefined") return;

  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
    overlayLayer = null;
  }

  mapInstance = L.map(containerId, {
    zoomControl: true,
    attributionControl: true,
    worldCopyJump: true,
    minZoom: 2,
    scrollWheelZoom: true,
  }).setView([22, 10], 2);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(mapInstance);

  overlayLayer = L.layerGroup().addTo(mapInstance);

  setTimeout(() => mapInstance.invalidateSize(), 100);
  window.addEventListener("resize", onResize);
}

function onResize() {
  if (mapInstance) mapInstance.invalidateSize();
}

/**
 * Redraw infection dots from latest metrics.
 * @param {Record<string, number>} metrics
 */
export function syncMapToMetrics(metrics) {
  if (!mapInstance || !overlayLayer || typeof L === "undefined") return;

  overlayLayer.clearLayers();

  const base = compositePressure(metrics);
  const inf = clamp(metrics.infection ?? 0, 0, 100);

  /** More infection → more red dots (Plague Inc.–style density). */
  const totalDots = Math.min(340, Math.round(18 + (inf / 100) * 320));

  for (let i = 0; i < totalDots; i++) {
    const { lat, lng } = dotLatLng(i, metrics, base);
    const jitterR = 1.8 + pseudoRandom(i * 3.17 + inf) * 2.8;
    const opacity = 0.55 + pseudoRandom(i * 5.5) * 0.4;
    const fill = inf > 70 ? "#ff1a2e" : inf > 40 ? "#e6283a" : "#c41e3a";

    const m = L.circleMarker([lat, lng], {
      radius: jitterR,
      fillColor: fill,
      fillOpacity: opacity,
      color: "rgba(40,0,0,0.45)",
      weight: 0.4,
      className: "infection-dot",
    });
    m.addTo(overlayLayer);
  }

  updateLegendReadout(base, totalDots, inf);
}

function updateLegendReadout(base, dotCount, infection) {
  const el = document.getElementById("map-legend-readout");
  if (el) {
    el.textContent = `Infection (demo): ${Math.round(infection)}/100 · ~${dotCount} red dots — denser = higher pressure in this teaching model (not real case locations). World stress index: ${Math.round(base)}/100.`;
  }
}
