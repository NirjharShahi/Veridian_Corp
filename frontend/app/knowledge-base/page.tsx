"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type KnowledgeItem = {
  code: string;
  title: string;
  category: string;
  content: string;
  source: string;
};

export default function KnowledgeBase() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKnowledgeBase() {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const response = await fetch(`${API_URL}/api/knowledge-base`);

        const data = await response.json();

        setItems(data.data);
      } catch (error) {
        console.error("Failed to load knowledge base:", error);
      } finally {
        setLoading(false);
      }
    }

    loadKnowledgeBase();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-blue-400">VERIDIAN CORP</p>

          <h1 className="mt-2 text-4xl font-bold">Knowledge Base</h1>

          <p className="mt-3 text-slate-400">
            Company policies and internal service information used by the AI
            agent.
          </p>
        </header>

        {loading ? (
          <p className="text-slate-400">Loading knowledge base...</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.code}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-blue-400">
                      {item.code}
                    </span>

                    <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                    {item.category}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {item.content}
                </p>

                <p className="mt-5 border-t border-slate-800 pt-4 text-xs text-slate-500">
                  Source: {item.source}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
