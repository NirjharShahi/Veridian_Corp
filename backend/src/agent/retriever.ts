import {
  getKnowledgeBase,
  getEmployeeRequests,
  getTickets,
} from "../services/dbService";

function getTerms(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2);
}

function scoreMatch(query: string, text: string): number {
  const terms = getTerms(query);
  const normalizedText = text.toLowerCase();

  return terms.filter((term) => normalizedText.includes(term)).length;
}

export async function retrieveContext(query: string) {
  const [knowledgeBase, employeeRequests, tickets] = await Promise.all([
    getKnowledgeBase(),
    getEmployeeRequests(),
    getTickets(),
  ]);

  const relevantKnowledgeBase = knowledgeBase
    .map((item) => ({
      item,
      score: scoreMatch(
        query,
        `${item.title} ${item.category} ${item.content}`,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ item }) => item);

  const relevantRequests = employeeRequests
    .map((item) => ({
      item,
      score: scoreMatch(
        query,
        `${item.employee} ${item.request} ${item.status}`,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ item }) => item);

  const relevantTickets = tickets
    .map((item) => ({
      item,
      score: scoreMatch(query, `${item.employee} ${item.issue} ${item.status}`),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ item }) => item);

  return {
    knowledgeBase: relevantKnowledgeBase,
    employeeRequests: relevantRequests,
    tickets: relevantTickets,
  };
}
