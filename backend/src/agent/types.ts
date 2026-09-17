export type AgentAction =
  "RESOLVE" | "INSTRUCT" | "REQUEST_INFO" | "ROUTE" | "ESCALATE";

export interface AgentDecision {
  action: AgentAction;
  response: string;
  reason: string;
  sources: string[];
}
