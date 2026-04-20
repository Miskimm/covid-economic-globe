// Research Tool — injected survey panel for prototype evaluation
// Addresses knowledge gaps from the DECO7180 Mapping Your Team Project worksheet

const TOOL_VERSION = '1.0';
const STORAGE_KEY = 'deco7180_research_responses';

const QUESTIONS = [
  // ── Step 1: Prototype identity
  {
    step: 1,
    title: 'Which Prototype Are You Testing?',
    subtitle: 'Help us identify which prototype this feedback belongs to.',
    fields: [
      {
        id: 'prototype_id',
        type: 'radio',
        label: 'Prototype number',
        required: true,
        options: [
          { value: '1', label: 'Prototype 1' },
          { value: '2', label: 'Prototype 2' },
          { value: '3', label: 'Prototype 3' },
          { value: '4', label: 'Prototype 4 — COVID Economic Globe (this one)' },
        ],
      },
      {
        id: 'time_spent',
        type: 'radio',
        label: 'How long did you spend with this prototype?',
        required: true,
        options: [
          { value: 'under5', label: 'Under 5 minutes' },
          { value: '5to10', label: '5 – 10 minutes' },
          { value: '10to20', label: '10 – 20 minutes' },
          { value: 'over20', label: 'More than 20 minutes' },
        ],
      },
    ],
  },

  // ── Step 2: Data visualisation preference  (Known Unknowns)
  {
    step: 2,
    title: 'Data Visualisation Preference',
    subtitle: 'Which presentation style helps you understand the data most clearly?',
    fields: [
      {
        id: 'viz_preference',
        type: 'radio',
        label: 'Which visualisation type do you prefer for this kind of data?',
        required: true,
        options: [
          { value: '3d_globe', label: '3D rotating globe' },
          { value: '2d_map', label: '2D flat map' },
          { value: 'charts', label: 'Charts / graphs only' },
          { value: 'dashboard', label: 'Dashboard with multiple panels' },
          { value: 'other', label: 'Other / no preference' },
        ],
      },
      {
        id: 'data_mode',
        type: 'radio',
        label: 'Do you prefer seeing data as daily changes or cumulative totals?',
        required: true,
        options: [
          { value: 'daily', label: 'Daily / dynamic — see changes day by day' },
          { value: 'cumulative', label: 'Cumulative — total figures over time' },
          { value: 'both', label: 'Both, switchable' },
        ],
      },
      {
        id: 'useful_data',
        type: 'checkbox',
        label: 'Which data points are most USEFUL to you? (select all that apply)',
        required: true,
        options: [
          { value: 'cases', label: 'Daily COVID cases' },
          { value: 'deaths', label: 'Deaths' },
          { value: 'gdp_shock', label: 'GDP shock / economic contraction' },
          { value: 'recovery', label: 'Economic recovery rate' },
          { value: 'correlation', label: 'Health–economy correlation / link' },
        ],
      },
      {
        id: 'link_clarity',
        type: 'scale',
        label: 'How clearly does this prototype show the link between health data and economic impact?',
        required: true,
        min: 1, max: 5,
        minLabel: 'Not clear at all',
        maxLabel: 'Very clear',
      },
    ],
  },

  // ── Step 3: Usability & globe interaction  (Unknown Knowns — verify assumptions)
  {
    step: 3,
    title: 'Usability & Interface Control',
    subtitle: 'We want to know if the 3D globe helps or hinders your understanding.',
    fields: [
      {
        id: 'find_country',
        type: 'scale',
        label: 'How easy was it to find the specific country or region you wanted?',
        required: true,
        min: 1, max: 5,
        minLabel: 'Very difficult',
        maxLabel: 'Very easy',
      },
      {
        id: 'globe_helped',
        type: 'radio',
        label: 'Did the 3D rotating globe help your understanding of the data?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes — it made the global spread clearer' },
          { value: 'neutral', label: 'Neutral — did not make much difference' },
          { value: 'no', label: 'No — it made it harder to focus on data' },
          { value: 'dizzying', label: 'The rotation caused distraction or discomfort' },
        ],
      },
      {
        id: 'interface_control',
        type: 'scale',
        label: 'How much control did you feel over the interface?',
        required: true,
        min: 1, max: 5,
        minLabel: 'No control',
        maxLabel: 'Full control',
      },
      {
        id: 'interaction_fatigue',
        type: 'radio',
        label: 'Did you experience interaction fatigue while using this prototype?',
        required: true,
        options: [
          { value: 'no', label: 'No — it felt smooth and natural' },
          { value: 'slight', label: 'Slight — a little tiring after a while' },
          { value: 'yes', label: 'Yes — I wanted to stop because it was too demanding' },
        ],
      },
    ],
  },

  // ── Step 4: Data trust & precision  (Critical Gap 3)
  {
    step: 4,
    title: 'Data Precision & Trust',
    subtitle: 'Your perception of data credibility helps us improve accuracy and presentation.',
    fields: [
      {
        id: 'data_trust',
        type: 'scale',
        label: 'How much do you trust the data shown in this prototype?',
        required: true,
        min: 1, max: 5,
        minLabel: 'I do not trust it',
        maxLabel: 'I fully trust it',
      },
      {
        id: 'data_precision',
        type: 'scale',
        label: 'How precisely does the data represent real-world economic and health impacts?',
        required: true,
        min: 1, max: 5,
        minLabel: 'Very imprecise',
        maxLabel: 'Very precise',
      },
      {
        id: 'micro_macro',
        type: 'radio',
        label: 'Did the prototype help you understand both large-scale (global) and specific (country-level) impacts?',
        required: true,
        options: [
          { value: 'both', label: 'Yes — I could see both global and country detail' },
          { value: 'macro_only', label: 'Mostly global picture, hard to zoom to specifics' },
          { value: 'micro_only', label: 'Mostly country detail, hard to see global picture' },
          { value: 'neither', label: 'Neither was clear enough' },
        ],
      },
    ],
  },

  // ── Step 5: Overall rating & open feedback
  {
    step: 5,
    title: 'Overall Impression',
    subtitle: 'A few final open questions to capture your experience.',
    fields: [
      {
        id: 'overall_rating',
        type: 'scale',
        label: 'Overall, how would you rate this prototype\'s effectiveness at communicating data?',
        required: true,
        min: 1, max: 5,
        minLabel: 'Poor',
        maxLabel: 'Excellent',
      },
      {
        id: 'most_valuable',
        type: 'textarea',
        label: 'What was the most valuable or impressive aspect of this prototype?',
        placeholder: 'e.g. "The GDP bar chart made the economic shock very visible"',
      },
      {
        id: 'biggest_improvement',
        type: 'textarea',
        label: 'What is the single most important thing you would improve?',
        placeholder: 'e.g. "I wish the globe could be paused or locked to one country"',
      },
      {
        id: 'other_comments',
        type: 'textarea',
        label: 'Any other comments or observations?',
        placeholder: 'Optional — anything else you noticed',
      },
    ],
  },
];

// ─── Build & inject HTML ───────────────────────────────────────────────────────

function buildSurveyHTML() {
  const stepsHTML = QUESTIONS.map((step, idx) => {
    const fieldsHTML = step.fields.map(renderField).join('');
    return `
      <div class="rt-step" data-step="${step.step}" style="display:none">
        <div class="rt-step-header">
          <div class="rt-step-num">Step ${step.step} of ${QUESTIONS.length}</div>
          <div class="rt-step-title">${step.title}</div>
          <div class="rt-step-sub">${step.subtitle}</div>
        </div>
        <div class="rt-fields">${fieldsHTML}</div>
      </div>`;
  }).join('');

  return `
  <div class="rt-fab-group">
    <a id="rt-results-btn" class="rt-fab rt-fab-results" href="results.html" title="View Survey Results" aria-label="View survey results">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
      <span class="rt-fab-label">Results</span>
    </a>
    <div id="rt-fab" class="rt-fab" title="Prototype Research Survey" role="button" tabindex="0" aria-label="Open research survey">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <span class="rt-fab-label">Survey</span>
    </div>
  </div>

  <div id="rt-overlay" class="rt-overlay" style="display:none" aria-hidden="true"></div>

  <div id="rt-panel" class="rt-panel" style="display:none" role="dialog" aria-modal="true" aria-label="Prototype Research Survey">
    <div class="rt-panel-header">
      <div class="rt-header-left">
        <div class="rt-header-tag">Research Tool</div>
        <div class="rt-header-title">Prototype Evaluation Survey</div>
      </div>
      <button class="rt-close" id="rt-close" aria-label="Close survey">✕</button>
    </div>

    <div class="rt-progress-bar">
      <div class="rt-progress-fill" id="rt-progress-fill"></div>
    </div>

    <div class="rt-body" id="rt-body">
      ${stepsHTML}
    </div>

    <div class="rt-footer">
      <button class="rt-btn rt-btn-ghost" id="rt-prev">← Back</button>
      <div class="rt-footer-mid">
        <div class="rt-dot-row" id="rt-dots"></div>
      </div>
      <button class="rt-btn rt-btn-primary" id="rt-next">Next →</button>
    </div>
  </div>

  <div id="rt-success" class="rt-success" style="display:none" role="dialog" aria-modal="true">
    <div class="rt-success-icon">✓</div>
    <div class="rt-success-title">Thank you!</div>
    <div class="rt-success-sub">Your response has been recorded.<br>You can export all responses below.</div>
    <a class="rt-btn rt-btn-primary" href="results.html" style="text-decoration:none">View Results Dashboard →</a>
    <button class="rt-btn rt-btn-primary" id="rt-export" style="background:rgba(143,246,204,0.12);border-color:rgba(143,246,204,0.28);color:#8ff6cc">Export All Responses (JSON)</button>
    <button class="rt-btn rt-btn-ghost" id="rt-success-close" style="margin-top:8px">Close</button>
  </div>`;
}

function renderField(field) {
  const label = `<div class="rt-field-label">${field.label}${field.required ? ' <span class="rt-req">*</span>' : ''}</div>`;

  if (field.type === 'radio') {
    const opts = field.options.map(o => `
      <label class="rt-option">
        <input type="radio" name="${field.id}" value="${o.value}">
        <span class="rt-option-dot"></span>
        <span class="rt-option-text">${o.label}</span>
      </label>`).join('');
    return `<div class="rt-field" data-id="${field.id}" data-required="${field.required || false}">${label}<div class="rt-options">${opts}</div></div>`;
  }

  if (field.type === 'checkbox') {
    const opts = field.options.map(o => `
      <label class="rt-option rt-option-check">
        <input type="checkbox" name="${field.id}" value="${o.value}">
        <span class="rt-option-dot rt-check-dot"></span>
        <span class="rt-option-text">${o.label}</span>
      </label>`).join('');
    return `<div class="rt-field" data-id="${field.id}" data-required="${field.required || false}">${label}<div class="rt-options">${opts}</div></div>`;
  }

  if (field.type === 'scale') {
    const ticks = Array.from({ length: field.max - field.min + 1 }, (_, i) => i + field.min);
    const ticksHTML = ticks.map(v => `
      <label class="rt-scale-cell">
        <input type="radio" name="${field.id}" value="${v}">
        <span class="rt-scale-dot"></span>
        <span class="rt-scale-num">${v}</span>
      </label>`).join('');
    return `
      <div class="rt-field" data-id="${field.id}" data-required="${field.required || false}">
        ${label}
        <div class="rt-scale-wrap">
          <div class="rt-scale-row">${ticksHTML}</div>
          <div class="rt-scale-labels">
            <span>${field.minLabel}</span>
            <span>${field.maxLabel}</span>
          </div>
        </div>
      </div>`;
  }

  if (field.type === 'textarea') {
    return `
      <div class="rt-field" data-id="${field.id}">
        ${label}
        <textarea class="rt-textarea" name="${field.id}" rows="3" placeholder="${field.placeholder || ''}"></textarea>
      </div>`;
  }

  return '';
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
  /* ── FAB group ── */
  .rt-fab-group {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  /* ── FAB ── */
  .rt-fab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 16px;
    border-radius: 999px;
    border: 1px solid rgba(104, 228, 255, 0.28);
    background: rgba(9, 18, 32, 0.92);
    backdrop-filter: blur(18px);
    color: #68e4ff;
    font-size: 12px;
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(104, 228, 255, 0.08), 0 8px 28px rgba(0,0,0,0.38);
    transition: box-shadow 160ms ease, transform 160ms ease;
    user-select: none;
  }
  .rt-fab:hover {
    box-shadow: 0 0 0 1px rgba(104, 228, 255, 0.22), 0 0 24px rgba(104, 228, 255, 0.18), 0 10px 32px rgba(0,0,0,0.42);
    transform: translateY(-2px);
  }
  .rt-fab-label { font-weight: 600; }
  .rt-fab-results {
    border-color: rgba(143, 246, 204, 0.28);
    color: #8ff6cc;
    text-decoration: none;
    box-shadow: 0 0 0 1px rgba(143,246,204,0.08), 0 8px 28px rgba(0,0,0,0.38);
  }
  .rt-fab-results:hover {
    box-shadow: 0 0 0 1px rgba(143,246,204,0.22), 0 0 24px rgba(143,246,204,0.18), 0 10px 32px rgba(0,0,0,0.42);
  }

  /* ── Overlay ── */
  .rt-overlay {
    position: fixed;
    inset: 0;
    z-index: 51;
    background: rgba(3, 7, 13, 0.62);
    backdrop-filter: blur(4px);
  }

  /* ── Panel ── */
  .rt-panel {
    position: fixed;
    bottom: 80px;
    right: 24px;
    z-index: 52;
    width: min(440px, calc(100vw - 32px));
    max-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    border-radius: 22px;
    border: 1px solid rgba(255,255,255,0.08);
    background: linear-gradient(180deg, rgba(9,16,30,0.96), rgba(6,11,20,0.94));
    backdrop-filter: blur(22px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.48), 0 0 0 1px rgba(104,228,255,0.06);
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    color: rgba(255,255,255,0.94);
    overflow: hidden;
  }

  .rt-panel-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 18px 20px 0;
    flex-shrink: 0;
  }
  .rt-header-tag {
    font-size: 10px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }
  .rt-header-title {
    margin-top: 5px;
    font-size: 18px;
    font-weight: 700;
    color: transparent;
    background: linear-gradient(90deg, #eff9ff 0%, #68e4ff 60%, #ffcb74 100%);
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 0.03em;
  }
  .rt-close {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 50%;
    color: rgba(255,255,255,0.6);
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 13px;
    flex-shrink: 0;
    margin-left: 12px;
    margin-top: 4px;
    transition: background 160ms;
  }
  .rt-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

  /* ── Progress ── */
  .rt-progress-bar {
    margin: 14px 20px 0;
    height: 3px;
    border-radius: 999px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
    overflow: hidden;
  }
  .rt-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #68e4ff, #ffcb74);
    transition: width 300ms ease;
  }

  /* ── Body / Steps ── */
  .rt-body {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 18px 20px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(104,228,255,0.2) transparent;
  }
  .rt-body::-webkit-scrollbar { width: 4px; }
  .rt-body::-webkit-scrollbar-track { background: transparent; }
  .rt-body::-webkit-scrollbar-thumb { background: rgba(104,228,255,0.2); border-radius: 999px; }

  .rt-step-num {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
  }
  .rt-step-title {
    margin-top: 5px;
    font-size: 15px;
    font-weight: 700;
    color: #68e4ff;
  }
  .rt-step-sub {
    margin-top: 5px;
    font-size: 12px;
    color: rgba(255,255,255,0.52);
    line-height: 1.55;
  }
  .rt-fields { margin-top: 16px; }

  /* ── Field ── */
  .rt-field {
    margin-bottom: 18px;
  }
  .rt-field-label {
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.82);
    margin-bottom: 10px;
    line-height: 1.4;
  }
  .rt-req { color: #ff667f; }

  /* ── Radio / Checkbox options ── */
  .rt-options { display: flex; flex-direction: column; gap: 7px; }
  .rt-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    cursor: pointer;
    transition: border-color 140ms, background 140ms;
    font-size: 12.5px;
    color: rgba(255,255,255,0.72);
  }
  .rt-option:hover { border-color: rgba(104,228,255,0.22); background: rgba(104,228,255,0.05); color: #fff; }
  .rt-option input[type="radio"],
  .rt-option input[type="checkbox"] { display: none; }

  .rt-option-dot {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.22);
    background: transparent;
    transition: border-color 140ms, background 140ms, box-shadow 140ms;
  }
  .rt-check-dot { border-radius: 4px; }

  .rt-option input[type="radio"]:checked ~ .rt-option-dot,
  .rt-option input[type="checkbox"]:checked ~ .rt-option-dot {
    border-color: #68e4ff;
    background: #68e4ff;
    box-shadow: 0 0 0 3px rgba(104,228,255,0.18);
  }
  .rt-option:has(input:checked) {
    border-color: rgba(104,228,255,0.3);
    background: rgba(104,228,255,0.08);
    color: #fff;
  }

  /* ── Scale ── */
  .rt-scale-row {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }
  .rt-scale-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    flex: 1;
  }
  .rt-scale-cell input { display: none; }
  .rt-scale-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.04);
    display: grid;
    place-items: center;
    transition: border-color 140ms, background 140ms, box-shadow 140ms;
  }
  .rt-scale-cell:hover .rt-scale-dot {
    border-color: rgba(104,228,255,0.4);
    background: rgba(104,228,255,0.08);
  }
  .rt-scale-cell input:checked ~ .rt-scale-dot {
    border-color: #68e4ff;
    background: rgba(104,228,255,0.18);
    box-shadow: 0 0 0 4px rgba(104,228,255,0.12);
  }
  .rt-scale-num {
    font-size: 11px;
    color: rgba(255,255,255,0.46);
  }
  .rt-scale-cell input:checked ~ .rt-scale-num { color: #68e4ff; font-weight: 700; }
  .rt-scale-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 10px;
    color: rgba(255,255,255,0.38);
  }

  /* ── Textarea ── */
  .rt-textarea {
    width: 100%;
    resize: vertical;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 10px 12px;
    color: rgba(255,255,255,0.88);
    font-size: 12.5px;
    font-family: inherit;
    line-height: 1.55;
    outline: none;
    transition: border-color 160ms;
  }
  .rt-textarea:focus { border-color: rgba(104,228,255,0.32); }
  .rt-textarea::placeholder { color: rgba(255,255,255,0.26); }

  /* ── Validation error ── */
  .rt-field.has-error .rt-field-label { color: #ff667f; }
  .rt-field.has-error .rt-option { border-color: rgba(255,102,127,0.2); }
  .rt-error-msg {
    margin-top: 6px;
    font-size: 11px;
    color: #ff667f;
  }

  /* ── Footer ── */
  .rt-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 20px 18px;
    flex-shrink: 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin-top: 8px;
  }
  .rt-dot-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .rt-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.18);
    transition: background 200ms, transform 200ms;
  }
  .rt-dot.active {
    background: #68e4ff;
    transform: scale(1.3);
    box-shadow: 0 0 8px rgba(104,228,255,0.4);
  }

  /* ── Buttons ── */
  .rt-btn {
    padding: 9px 18px;
    border-radius: 999px;
    font-size: 12px;
    font-family: inherit;
    font-weight: 600;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: opacity 160ms, transform 160ms;
  }
  .rt-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  .rt-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
  .rt-btn-primary {
    background: rgba(104,228,255,0.18);
    border: 1px solid rgba(104,228,255,0.3);
    color: #68e4ff;
  }
  .rt-btn-ghost {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.6);
  }

  /* ── Success screen ── */
  .rt-success {
    position: fixed;
    bottom: 80px;
    right: 24px;
    z-index: 52;
    width: min(380px, calc(100vw - 32px));
    padding: 32px 24px;
    border-radius: 22px;
    border: 1px solid rgba(143,246,204,0.2);
    background: linear-gradient(180deg, rgba(9,16,30,0.97), rgba(6,11,20,0.95));
    backdrop-filter: blur(22px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.48);
    text-align: center;
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    color: rgba(255,255,255,0.88);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .rt-success-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 2px solid #8ff6cc;
    display: grid;
    place-items: center;
    font-size: 24px;
    color: #8ff6cc;
    box-shadow: 0 0 24px rgba(143,246,204,0.22);
  }
  .rt-success-title {
    font-size: 22px;
    font-weight: 700;
    color: #8ff6cc;
  }
  .rt-success-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.56);
    line-height: 1.6;
  }
  `;
  document.head.appendChild(style);
}

// ─── State & Logic ─────────────────────────────────────────────────────────────

let currentStep = 1;
const totalSteps = QUESTIONS.length;
const formData = {};

function getPanel() { return document.getElementById('rt-panel'); }
function getOverlay() { return document.getElementById('rt-overlay'); }
function getSuccess() { return document.getElementById('rt-success'); }

function setStep(step) {
  currentStep = step;
  document.querySelectorAll('.rt-step').forEach(el => {
    el.style.display = Number(el.dataset.step) === step ? 'block' : 'none';
  });
  const pct = ((step - 1) / (totalSteps - 1)) * 100;
  document.getElementById('rt-progress-fill').style.width = pct + '%';
  document.getElementById('rt-prev').disabled = step === 1;
  document.getElementById('rt-next').textContent = step === totalSteps ? 'Submit ✓' : 'Next →';
  document.querySelectorAll('.rt-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i + 1 === step);
  });
  document.getElementById('rt-body').scrollTop = 0;
}

function buildDots() {
  const row = document.getElementById('rt-dots');
  row.innerHTML = Array.from({ length: totalSteps }, (_, i) =>
    `<div class="rt-dot${i + 1 === 1 ? ' active' : ''}"></div>`
  ).join('');
}

function collectStep(step) {
  const stepConfig = QUESTIONS[step - 1];
  let valid = true;

  stepConfig.fields.forEach(field => {
    const fieldEl = document.querySelector(`.rt-field[data-id="${field.id}"]`);
    fieldEl.classList.remove('has-error');
    const errEl = fieldEl.querySelector('.rt-error-msg');
    if (errEl) errEl.remove();

    if (field.type === 'radio') {
      const checked = fieldEl.querySelector('input[type="radio"]:checked');
      if (field.required && !checked) {
        markError(fieldEl, 'Please select an option.');
        valid = false;
      } else if (checked) {
        formData[field.id] = checked.value;
      }
    } else if (field.type === 'checkbox') {
      const checked = [...fieldEl.querySelectorAll('input[type="checkbox"]:checked')].map(c => c.value);
      if (field.required && checked.length === 0) {
        markError(fieldEl, 'Please select at least one option.');
        valid = false;
      } else {
        formData[field.id] = checked;
      }
    } else if (field.type === 'scale') {
      const checked = fieldEl.querySelector('input[type="radio"]:checked');
      if (field.required && !checked) {
        markError(fieldEl, 'Please select a value.');
        valid = false;
      } else if (checked) {
        formData[field.id] = Number(checked.value);
      }
    } else if (field.type === 'textarea') {
      const ta = fieldEl.querySelector('textarea');
      formData[field.id] = ta.value.trim();
    }
  });

  return valid;
}

function markError(fieldEl, msg) {
  fieldEl.classList.add('has-error');
  const div = document.createElement('div');
  div.className = 'rt-error-msg';
  div.textContent = msg;
  fieldEl.appendChild(div);
}

function saveResponse() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const entry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    version: TOOL_VERSION,
    ...formData,
  };
  stored.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return entry;
}

function exportJSON() {
  const data = localStorage.getItem(STORAGE_KEY) || '[]';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `deco7180_prototype_responses_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Init ──────────────────────────────────────────────────────────────────────

export function initResearchTool() {
  injectCSS();

  const container = document.createElement('div');
  container.id = 'rt-root';
  container.innerHTML = buildSurveyHTML();
  document.body.appendChild(container);

  buildDots();
  setStep(1);

  // Open
  document.getElementById('rt-fab').addEventListener('click', () => {
    getPanel().style.display = 'flex';
    getOverlay().style.display = 'block';
    getSuccess().style.display = 'none';
  });
  document.getElementById('rt-fab').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') document.getElementById('rt-fab').click();
  });

  // Close
  document.getElementById('rt-close').addEventListener('click', close);
  getOverlay().addEventListener('click', close);
  document.getElementById('rt-success-close').addEventListener('click', () => {
    getSuccess().style.display = 'none';
    getOverlay().style.display = 'none';
  });

  // Navigation
  document.getElementById('rt-prev').addEventListener('click', () => {
    if (currentStep > 1) setStep(currentStep - 1);
  });

  document.getElementById('rt-next').addEventListener('click', () => {
    if (!collectStep(currentStep)) return;
    if (currentStep < totalSteps) {
      setStep(currentStep + 1);
    } else {
      saveResponse();
      getPanel().style.display = 'none';
      getSuccess().style.display = 'flex';
    }
  });

  document.getElementById('rt-export').addEventListener('click', exportJSON);
}

function close() {
  getPanel().style.display = 'none';
  getOverlay().style.display = 'none';
}
