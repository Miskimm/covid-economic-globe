import {
  INITIAL_METRICS,
  tickDelayedEffects,
  queueFromPolicies,
  immediateFromPolicies,
  applyDeltas,
  simulateNature,
  maybeRandomEvent,
  evaluateGameEnd,
} from "./simulation.js";

export function cloneInitialState() {
  return {
    turn: 1,
    metrics: { ...INITIAL_METRICS },
    delayedQueue: [],
    selection: [],
    statusLines: ["Week 1 — Open Policies to choose actions, then advance the week."],
    history: [{ turn: 1, ...INITIAL_METRICS }],
    gameOver: null,
    loseReason: "",
    consecutiveStable: 0,
  };
}

export function gameReducer(state, action) {
  if (state.gameOver && action.type !== "RESET") {
    return state;
  }

  switch (action.type) {
    case "TOGGLE_POLICY": {
      const id = action.policyId;
      const has = state.selection.includes(id);
      const selection = has ? state.selection.filter((x) => x !== id) : [...state.selection, id];
      return { ...state, selection };
    }

    case "CLEAR_SELECTION": {
      return { ...state, selection: [] };
    }

    case "END_TURN": {
      const log = [];

      let delayed = tickDelayedEffects(state.metrics, state.delayedQueue);
      let metrics = delayed.metrics;
      log.push(...delayed.log.map((l) => `↳ ${l}`));

      const immediate = immediateFromPolicies(state.selection);
      if (Object.keys(immediate).length) {
        metrics = applyDeltas(metrics, immediate);
        log.push(`Policies enacted: ${state.selection.length ? state.selection.join(", ") : "(none)"}`);
      } else {
        log.push("No new policies — only ongoing effects and natural spread.");
      }

      const newDelayed = queueFromPolicies(state.selection);
      const delayedQueue = [...delayed.queue, ...newDelayed];
      if (newDelayed.length) {
        log.push(`Scheduled follow-on effects (${newDelayed.length} program(s)).`);
      }

      metrics = simulateNature(metrics);

      const ev = maybeRandomEvent(metrics);
      metrics = ev.metrics;
      if (ev.message) {
        log.push(ev.message);
      }

      const turn = state.turn + 1;

      const stableBand =
        metrics.infection < 38 &&
        metrics.economy >= 42 &&
        metrics.death < 45 &&
        metrics.publicSat >= 28;
      const consecutiveStable = stableBand ? state.consecutiveStable + 1 : 0;

      const history = [...state.history, { turn, ...metrics }];

      const nextState = {
        ...state,
        turn,
        metrics,
        delayedQueue,
        selection: [],
        statusLines: log,
        history,
        consecutiveStable,
      };

      const verdict = evaluateGameEnd(nextState);
      if (verdict.over) {
        return {
          ...nextState,
          gameOver: verdict.outcome,
          loseReason: verdict.reason || "",
        };
      }

      return nextState;
    }

    case "RESET": {
      return cloneInitialState();
    }

    default:
      return state;
  }
}
