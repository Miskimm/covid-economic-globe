const initialMessage = [
    "Select a country or move the timeline, then ask what the COVID and GDP values mean.",
    "I will explain visible patterns, definitions, and limitations without claiming simple causation."
].join(" ");

function formatCompact(value) {
    if (!Number.isFinite(value)) return "--";
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(value);
}

function formatSigned(value) {
    if (!Number.isFinite(value)) return "--";
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${value.toFixed(1)}pp`;
}

function formatPercent(value) {
    if (!Number.isFinite(value)) return "--";
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${value.toFixed(1)}%`;
}

function fallbackAnswer(question, context) {
    const country = context?.country;
    const point = context?.point;
    const selectedLabel = context?.selectedLabel || "the selected date";
    const sourceSummary = context?.sourceSummary || "the current dataset";
    const text = String(question || "").toLowerCase();

    if (!country || !point) {
        return "Please select a country first. The explanation works best when it can read the selected country, time point, COVID values, and GDP indicators from the screen.";
    }

    if (text.includes("cause") || text.includes("causation") || text.includes("caused")) {
        return [
            `For ${country.name}, the current view can show that COVID indicators and GDP recovery indicators changed across the same broad period.`,
            "However, this is not enough to prove that COVID cases directly caused the GDP change. GDP recovery can also be affected by lockdown policy, trade, labour markets, tourism, fiscal support, and country-specific conditions.",
            "A safer interpretation is: the prototype helps compare health pressure and economic recovery over time, but any causal claim needs further evidence."
        ].join(" ");
    }

    if (text.includes("shock") || text.includes("recovery") || text.includes("gdp")) {
        return [
            `GDP shock means the difference between ${country.name}'s 2020 GDP growth and its 2019 GDP growth. In this dataset, that shock is ${formatSigned(country.shock)}.`,
            `Recovery means the change from 2020 to 2023. For ${country.name}, the recovery value is ${formatSigned(country.recovery)}.`,
            "These values are useful for reading contraction and rebound, but they should be read together with the selected time point and COVID indicators."
        ].join(" ");
    }

    if (text.includes("source") || text.includes("trust") || text.includes("data")) {
        return [
            `This prototype is using ${sourceSummary}.`,
            "The AI explanation should only interpret the values already shown on screen. It should not invent missing figures or replace source checking.",
            "For a final exhibit, keeping source labels beside the explanation is important because economic data can be interpreted differently depending on definitions and update timing."
        ].join(" ");
    }

    return [
        `At ${selectedLabel}, ${country.name} shows about ${formatCompact(point.cases)} cumulative COVID cases and ${formatCompact(point.deaths)} deaths in this view.`,
        `The mapped GDP path is ${formatPercent(point.gdp)}, while the broader 2019-2020 GDP shock is ${formatSigned(country.shock)} and the 2020-2023 recovery is ${formatSigned(country.recovery)}.`,
        "This suggests the country can be read through both health pressure and economic rebound, but the relationship should be interpreted as a pattern for comparison rather than a direct causal conclusion."
    ].join(" ");
}

function addMessage(container, role, text) {
    const message = document.createElement("div");
    message.className = `ai-guide-message ${role}`;
    message.textContent = text;
    container.append(message);
    container.scrollTop = container.scrollHeight;
    return message;
}

async function askAssistant(question, context) {
    const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context })
    });

    if (!response.ok) {
        throw new Error(`Explanation request failed: ${response.status}`);
    }

    const payload = await response.json();
    return payload.answer || fallbackAnswer(question, context);
}

export function initAiAssistant({ getContext }) {
    const root = document.getElementById("aiGuide");
    const toggle = document.getElementById("aiGuideToggle");
    const panel = document.getElementById("aiGuidePanel");
    const close = document.getElementById("aiGuideClose");
    const form = document.getElementById("aiGuideForm");
    const input = document.getElementById("aiGuideInput");
    const messages = document.getElementById("aiGuideMessages");

    if (!root || !toggle || !panel || !close || !form || !input || !messages) {
        return;
    }

    let hasOpened = false;
    let pending = false;

    function openPanel() {
        panel.hidden = false;
        root.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        if (!hasOpened) {
            addMessage(messages, "assistant", initialMessage);
            hasOpened = true;
        }
        input.focus();
    }

    function closePanel() {
        panel.hidden = true;
        root.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    }

    async function submitQuestion(question) {
        const trimmed = String(question || "").trim();
        if (!trimmed || pending) return;

        pending = true;
        addMessage(messages, "user", trimmed);
        input.value = "";
        const loading = addMessage(messages, "assistant", "Reading the selected country, timeline, and indicators...");

        const context = typeof getContext === "function" ? getContext() : {};
        try {
            loading.textContent = await askAssistant(trimmed, context);
        } catch (error) {
            console.warn(error);
            loading.textContent = fallbackAnswer(trimmed, context);
        } finally {
            pending = false;
        }
    }

    toggle.addEventListener("click", () => {
        if (panel.hidden) {
            openPanel();
        } else {
            closePanel();
        }
    });

    close.addEventListener("click", closePanel);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        void submitQuestion(input.value);
    });

    root.querySelectorAll("[data-ai-prompt]").forEach((button) => {
        button.addEventListener("click", () => {
            openPanel();
            void submitQuestion(button.getAttribute("data-ai-prompt"));
        });
    });
}
