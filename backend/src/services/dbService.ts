import { db } from "../prisma/db";

export async function getKnowledgeBase() {
  return await db.orm.knowledge_base.all();
}

export async function getEmployeeRequests() {
  return await db.orm.employee_requests.all();
}

export async function getTickets() {
  return await db.orm.tickets.all();
}
