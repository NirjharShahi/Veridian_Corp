import { retrieveContext } from "./retriever";
import { askGemini } from "../services/geminiService";
import { validateDecision } from "./validator";
import type { AgentDecision } from "./types";

export async function runAgent(userMessage: string): Promise<AgentDecision> {
  const context = await retrieveContext(userMessage);

  const prompt = `
You are Veridian Corp's internal IT service agent.

Your job is to help employees using ONLY the provided company knowledge and internal records.

Employee request:
${userMessage}

Knowledge Base:
${JSON.stringify(context.knowledgeBase, null, 2)}

Employee Requests:
${JSON.stringify(context.employeeRequests, null, 2)}

Tickets:
${JSON.stringify(context.tickets, null, 2)}

Choose exactly ONE action:
RESOLVE
INSTRUCT
REQUEST_INFO
ROUTE
ESCALATE

Return ONLY valid JSON in this exact structure:

{
  "action": "RESOLVE | INSTRUCT | REQUEST_INFO | ROUTE | ESCALATE",
  "response": "A concise response to the employee",
  "reason": "Why this action was selected based on the provided information",
  "sources": ["KB-01"]
}

Rules:
- Do not invent company policies.
- Use the Knowledge Base as the primary policy source.
- Use employee requests and tickets as supporting internal context.
- If the information is insufficient, use REQUEST_INFO.
- If another department owns the request, use ROUTE.
- Security incidents should be handled according to the Security Incident Reporting policy.
- Keep the response professional and concise.
`;

  const rawResponse = await askGemini(prompt);

  try {
    const cleaned = rawResponse
      .replace(/^```json\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const decision = JSON.parse(cleaned) as AgentDecision;

    const availableSources = [
      ...context.knowledgeBase.map((item) => item.code),
    ];

    return validateDecision(decision, availableSources);
  } catch {
    return {
      action: "REQUEST_INFO",
      response: "I need more information to process this request.",
      reason:
        "The AI response could not be parsed into the required decision format.",
      sources: [],
    };
  }
}
