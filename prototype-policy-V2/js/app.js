/**
 * Plain DOM UI — binds controls to gameReducer (no JSX / no React).
 */

import { gameReducer, cloneInitialState } from "./gameReducer.js";
import { POLICIES } from "./simulation.js";
import { initWorldMap, syncMapToMetrics } from "./worldMap.js";

const METRIC_META = [
  { key: "infection", label: "Infection", color: "#e85d6c" },
  { key: "death", label: "Death rate", color: "#9b59b6" },
  { key: "economy", label: "Economy", color: "#3d9cf0" },
  { key: "publicSat", label: "Public", color: "#f5a623" },
  { key: "healthcare", label: "Healthcare", color: "#3ecf8e" },
];

let state = cloneInitialState();
let endDialogShown = false;

function dispatch(action) {
  state = gameReducer(state, action);
  if (action.type === "RESET") {
    endDialogShown = false;
  }
  render();
}

function $(sel) {
  return document.querySelector(sel);
}

function renderMetrics() {
  const host = $("#metrics-host");
  if (!host) return;
  host.innerHTML = "";
  const { metrics } = state;
  for (const { key, label, color } of METRIC_META) {
    const v = Math.round(metrics[key]);
    const row = document.createElement("div");
    row.className = "metric-compact";
    row.innerHTML = `
      <div class="metric-compact__top">
        <span class="metric-compact__label">${label}</span>
        <span class="metric-compact__num" style="color:${color}">${v}</span>
      </div>
      <div class="metric-compact__bar"><span style="width:${v}%;background:${color}"></span></div>
    `;
    host.appendChild(row);
  }
}

function renderStatusPreview() {
  const el = $("#status-preview");
  if (!el) return;
  const last = state.statusLines[state.statusLines.length - 1] || "—";
  el.textContent = last.length > 140 ? last.slice(0, 137) + "…" : last;
}

function renderStatusDialog() {
  const list = $("#status-full-list");
  if (!list) return;
  list.innerHTML = "";
  for (const line of state.statusLines) {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  }
}

function renderPolicyButtons() {
  const host = $("#policy-buttons");
  if (!host) return;
  host.innerHTML = "";
  for (const p of POLICIES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "policy-chip";
    btn.dataset.policyId = p.id;
    btn.innerHTML = `<span class="policy-chip__title">${p.label}</span><span class="policy-chip__short">${p.short}</span>`;
    btn.addEventListener("click", () => {
      if (state.gameOver) return;
      dispatch({ type: "TOGGLE_POLICY", policyId: p.id });
    });
    host.appendChild(btn);
  }
}

function syncPolicySelectionClasses() {
  const frozen = !!state.gameOver;
  document.querySelectorAll(".policy-chip").forEach((btn) => {
    const id = btn.dataset.policyId;
    btn.classList.toggle("policy-chip--on", state.selection.includes(id));
    btn.disabled = frozen;
  });
  const hint = $("#selection-hint");
  if (hint) {
    const n = state.selection.length;
    hint.textContent = frozen ? "Game ended" : n ? `${n} selected` : "None selected";
  }

  const adv = $("#btn-advance");
  const clr = $("#btn-clear");
  if (adv) adv.disabled = frozen;
  if (clr) clr.disabled = frozen || state.selection.length === 0;
}

function maybeShowEndDialog() {
  const dlgEnd = $("#dialog-end");
  if (!state.gameOver || !dlgEnd || endDialogShown) return;
  const titleEl = $("#end-title");
  titleEl.textContent =
    state.gameOver === "win" ? "Situation stabilised" : "Situation out of control";
  titleEl.className = "end-title " + (state.gameOver === "win" ? "win" : "lose");
  $("#end-body").textContent = state.loseReason;
  dlgEnd.showModal();
  endDialogShown = true;
}

function render() {
  const week = $("#hud-week");
  if (week) week.textContent = String(state.turn);

  renderMetrics();
  renderStatusPreview();
  syncMapToMetrics(state.metrics);
  syncPolicySelectionClasses();
  maybeShowEndDialog();
}

function openDialog(id) {
  const d = document.getElementById(id);
  if (d && typeof d.showModal === "function") {
    if (id === "dialog-status") renderStatusDialog();
    d.showModal();
  }
}

function init() {
  document.querySelectorAll("[data-open-dialog]").forEach((btn) => {
    btn.addEventListener("click", () => openDialog(btn.dataset.openDialog));
  });

  $("#btn-clear")?.addEventListener("click", () => dispatch({ type: "CLEAR_SELECTION" }));

  $("#btn-advance")?.addEventListener("click", () => {
    dispatch({ type: "END_TURN" });
    renderStatusDialog();
    const policiesDlg = document.getElementById("dialog-policies");
    policiesDlg?.close();
    // Return focus for keyboard / screen-reader users (dialog removes focus trap on close).
    document.querySelector('[data-open-dialog="dialog-policies"]')?.focus();
  });

  $("#btn-replay")?.addEventListener("click", () => {
    $("#dialog-end")?.close();
    dispatch({ type: "RESET" });
    renderPolicyButtons();
    render();
  });

  document.querySelectorAll(".modal-sheet").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) dlg.close();
    });
  });

  initWorldMap("map-bg");
  renderPolicyButtons();
  render();
}

init();
