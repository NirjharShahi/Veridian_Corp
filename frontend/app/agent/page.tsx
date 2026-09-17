"use client";

import { useState } from "react";

type AgentDecision = {
  action: string;
  response: string;
  reason: string;
  sources: string[];
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [decision, setDecision] = useState<AgentDecision | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message.trim()) return;

    setLoading(true);
    setDecision(null);

    try {
      const response = await fetch("http://localhost:5000/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Agent request failed");
      }

      const data = await response.json();
      setDecision(data);
    } catch (error) {
      console.error(error);

      setDecision({
        action: "ERROR",
        response: "Unable to connect to the Veridian service agent.",
        reason: "The backend service could not be reached.",
        sources: [],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <nav className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="text-sm font-semibold text-slate-300">VERIDIAN</div>

          <div className="flex gap-3">
            <a
              href="/dashboard"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              Operations
            </a>

            <a
              href="/knowledge-base"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              Knowledge Base
            </a>
          </div>
        </nav>
        {/* Header */}
        <header className="mb-10">
          <div className="mb-2 text-sm font-medium text-blue-400">
            VERIDIAN CORP
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Internal Service Agent
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            AI-powered internal IT support using company policies, employee
            requests, and ticket history.
          </p>
        </header>

        {/* Chat Card */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">How can I help?</h2>

            <p className="mt-1 text-sm text-slate-400">
              Ask about IT policies, access, hardware, software, or security
              issues.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "My account is locked after 6 failed password attempts.",
                "I work from home 4 days a week. How can I get a monitor?",
                "My VPN credentials have expired.",
                "I received a suspicious phishing email.",
              ].map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setMessage(example)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-400 transition hover:border-blue-500 hover:text-blue-400"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Example: My VPN credentials have expired..."
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm outline-none transition focus:border-blue-500"
            />

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Ask Agent"}
              </button>
            </div>
          </form>
        </section>

        {/* Agent Result */}
        {decision && (
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Agent Decision</h2>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                {decision.action}
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Response
                </p>

                <p className="text-slate-200">{decision.response}</p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Reason
                </p>

                <p className="text-sm text-slate-400">{decision.reason}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Sources
                </p>

                <div className="flex flex-wrap gap-2">
                  {decision.sources.length > 0 ? (
                    decision.sources.map((source) => (
                      <span
                        key={source}
                        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300"
                      >
                        {source}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No sources returned
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Architecture hint */}
        <footer className="mt-auto pt-10 text-center text-xs text-slate-600">
          Retrieval → AI Reasoning → Policy Validation → Decision
        </footer>
      </div>
    </main>
  );
}
