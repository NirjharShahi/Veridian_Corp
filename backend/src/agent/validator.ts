import type { AgentDecision } from "./types";

const VALID_ACTIONS = [
  "RESOLVE",
  "INSTRUCT",
  "REQUEST_INFO",
  "ROUTE",
  "ESCALATE",
] as const;

export function validateDecision(
  decision: AgentDecision,
  availableSources: string[],
): AgentDecision {
  if (!VALID_ACTIONS.includes(decision.action)) {
    throw new Error(`Invalid agent action: ${decision.action}`);
  }

  const validSources = decision.sources.filter((source) =>
    availableSources.includes(source),
  );

  return {
    ...decision,
    sources: validSources,
  };
}
