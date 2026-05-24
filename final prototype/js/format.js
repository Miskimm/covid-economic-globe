export function formatCompact(value) {
    if (!Number.isFinite(value)) {
        return "--";
    }
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(value);
}

export function formatSigned(value, digits = 1) {
    if (!Number.isFinite(value)) {
        return "--";
    }
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${value.toFixed(digits)}pp`;
}
