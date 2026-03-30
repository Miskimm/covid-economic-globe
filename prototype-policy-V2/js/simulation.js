/**
 * Pandemic policy simulation — teaching prototype (not epidemiology).
 * See original comments in React version; logic unchanged.
 */

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function jitter(amount) {
  return (Math.random() - 0.5) * 2 * amount;
}

export const INITIAL_METRICS = {
  infection: 38,
  death: 12,
  economy: 62,
  publicSat: 58,
  healthcare: 72,
};

export const POLICIES = [
  {
    id: "lockdown",
    label: "Lockdown",
    short: "Strong transmission cut; heavy economic & social cost.",
    immediate: { infection: -10, economy: -14, publicSat: -8, healthcare: 4 },
  },
  {
    id: "masks",
    label: "Mask mandate",
    short: "Modest infection reduction; minor friction.",
    immediate: { infection: -4, publicSat: -2, economy: -1 },
  },
  {
    id: "vaccine",
    label: "Vaccine push",
    short: "Small hope now; ramps down infection over several weeks.",
    immediate: { publicSat: 3, economy: -2 },
    delayed: { infection: -3, publicSat: 1 },
    delayedTurns: 5,
  },
  {
    id: "travel_ban",
    label: "Travel restrictions",
    short: "Cuts imported risk; hurts trade & mobility.",
    immediate: { infection: -6, economy: -7, publicSat: -4 },
  },
  {
    id: "schools",
    label: "School closures",
    short: "Protects spread via schools; strains families & workforce.",
    immediate: { infection: -5, economy: -6, publicSat: -7 },
  },
  {
    id: "stimulus",
    label: "Economic stimulus",
    short: "Boosts economy & mood; slightly more mixing → tiny infection uptick.",
    immediate: { economy: 12, publicSat: 5, infection: 2, healthcare: -2 },
  },
];

export function applyDeltas(metrics, partial) {
  const next = { ...metrics };
  const keys = ["infection", "death", "economy", "publicSat", "healthcare"];
  for (const k of keys) {
    if (typeof partial[k] === "number") {
      next[k] = clamp(next[k] + partial[k]);
    }
  }
  return next;
}

export function tickDelayedEffects(metrics, queue) {
  let m = { ...metrics };
  const log = [];
  const nextQueue = [];

  for (const effect of queue) {
    if (effect.turnsRemaining <= 0) continue;
    m = applyDeltas(m, effect.deltaPerTurn);
    log.push(`Ongoing: ${effect.id} (${effect.turnsRemaining - 1} wk left)`);
    const left = effect.turnsRemaining - 1;
    if (left > 0) {
      nextQueue.push({ ...effect, turnsRemaining: left });
    }
  }

  return { metrics: m, queue: nextQueue, log };
}

export function queueFromPolicies(selectedIds) {
  const added = [];
  for (const id of selectedIds) {
    const p = POLICIES.find((x) => x.id === id);
    if (p?.delayed && p?.delayedTurns) {
      added.push({
        id: p.label,
        turnsRemaining: p.delayedTurns,
        deltaPerTurn: p.delayed,
      });
    }
  }
  return added;
}

export function immediateFromPolicies(selectedIds) {
  let sum = {};
  for (const id of selectedIds) {
    const p = POLICIES.find((x) => x.id === id);
    if (p?.immediate) {
      for (const [k, v] of Object.entries(p.immediate)) {
        sum[k] = (sum[k] || 0) + v;
      }
    }
  }
  return sum;
}

export function simulateNature(metrics) {
  let m = { ...metrics };

  const compliance = m.publicSat / 100;
  const spread = 2.8 * (1 - compliance * 0.35) + jitter(1.2);
  m.infection = clamp(m.infection + spread);

  const capacityFactor = m.healthcare / 100;
  m.healthcare = clamp(m.healthcare - m.infection * 0.06 + 3 + jitter(0.8));
  m.death = clamp(
    m.death + (m.infection * 0.08) * (2 - capacityFactor) - m.healthcare * 0.03 + jitter(1)
  );

  m.economy = clamp(
    m.economy - m.infection * 0.07 - m.death * 0.05 + (m.infection < 35 ? 2 : 0) + jitter(1)
  );
  m.publicSat = clamp(
    m.publicSat - m.death * 0.04 - (100 - m.economy) * 0.05 + jitter(1.2)
  );

  return m;
}

export function maybeRandomEvent(metrics) {
  if (Math.random() > 0.14) return { metrics, message: null };

  const roll = Math.random();
  if (roll < 0.33) {
    return {
      metrics: applyDeltas(metrics, {
        infection: 10 + jitter(2),
        publicSat: -6,
      }),
      message: "Event: concerning variant reports — public anxiety rises.",
    };
  }
  if (roll < 0.66) {
    return {
      metrics: applyDeltas(metrics, {
        publicSat: -12,
        economy: -6,
      }),
      message: "Event: protests over restrictions / fatigue.",
    };
  }
  return {
    metrics: applyDeltas(metrics, {
      infection: -5,
      publicSat: 4,
      healthcare: 3,
    }),
    message: "Event: breakthrough in treatment logistics — morale improves.",
  };
}

export function evaluateGameEnd(state) {
  const { metrics: m, turn, consecutiveStable } = state;

  if (m.healthcare <= 8) {
    return { over: true, outcome: "lose", reason: "Healthcare system collapsed under sustained pressure." };
  }
  if (m.infection >= 92) {
    return { over: true, outcome: "lose", reason: "Infection overwhelmed population before measures could stick." };
  }
  if (m.publicSat <= 12) {
    return { over: true, outcome: "lose", reason: "Public trust collapsed — unrest and non-compliance." };
  }
  if (m.death >= 88) {
    return { over: true, outcome: "lose", reason: "Mortality crisis — political and ethical breaking point." };
  }

  const stableWin =
    m.infection < 38 && m.economy >= 42 && m.death < 45 && m.publicSat >= 28;
  if (stableWin && consecutiveStable >= 2 && turn >= 6) {
    return {
      over: true,
      outcome: "win",
      reason: "You held infection in check while keeping the economy and society breathing.",
    };
  }

  return { over: false };
}
