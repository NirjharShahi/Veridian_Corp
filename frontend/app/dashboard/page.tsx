"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type EmployeeRequest = {
  code: string;
  employee: string;
  requestDate: string;
  request: string;
  status: string;
};

type Ticket = {
  code: string;
  employee: string;
  issue: string;
  status: string;
};

export default function Dashboard() {
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const [requestsResponse, ticketsResponse] = await Promise.all([
          fetch(`${API_URL}/api/employee-requests`),
          fetch(`${API_URL}/api/tickets`),
        ]);

        const requestsData = await requestsResponse.json();
        const ticketsData = await ticketsResponse.json();

        setRequests(requestsData.data);
        setTickets(ticketsData.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const activeTickets = tickets.filter(
    (ticket) => !ticket.status.toLowerCase().includes("closed"),
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10">
          <p className="text-sm font-medium text-blue-400">VERIDIAN CORP</p>

          <h1 className="mt-2 text-4xl font-bold">Service Operations</h1>

          <p className="mt-3 text-slate-400">
            Employee requests and internal IT ticket activity.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Employee Requests</p>

            <p className="mt-2 text-3xl font-bold">
              {loading ? "—" : requests.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Tickets</p>

            <p className="mt-2 text-3xl font-bold">
              {loading ? "—" : tickets.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Active Tickets</p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {loading ? "—" : activeTickets}
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Employee Requests</h2>

            <p className="mt-1 text-sm text-slate-400">
              Requests available to the internal service agent.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Employee</th>
                  <th className="px-3 py-3">Request</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request.code}
                    className="border-b border-slate-800/60"
                  >
                    <td className="px-3 py-4 font-medium text-blue-400">
                      {request.code}
                    </td>

                    <td className="px-3 py-4">{request.employee}</td>

                    <td className="max-w-xl px-3 py-4 text-slate-300">
                      {request.request}
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Ticket Queue</h2>

            <p className="mt-1 text-sm text-slate-400">
              Current and historical service tickets.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="px-3 py-3">Ticket</th>
                  <th className="px-3 py-3">Employee</th>
                  <th className="px-3 py-3">Issue</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.code}
                    className="border-b border-slate-800/60"
                  >
                    <td className="px-3 py-4 font-medium text-blue-400">
                      {ticket.code}
                    </td>

                    <td className="px-3 py-4">{ticket.employee}</td>

                    <td className="px-3 py-4 text-slate-300">{ticket.issue}</td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
