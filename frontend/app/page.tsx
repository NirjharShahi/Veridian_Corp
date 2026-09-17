import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const features = [
  {
    title: "AI Service Agent",
    description:
      "Get policy-aware answers for internal IT requests using company knowledge and service records.",
    href: "/agent",
    action: "Open Agent",
  },
  {
    title: "Service Operations",
    description:
      "Monitor employee requests and internal IT ticket activity from a centralized operations view.",
    href: "/dashboard",
    action: "View Operations",
  },
  {
    title: "Knowledge Base",
    description:
      "Browse the internal policies and service information available to the AI agent.",
    href: "/knowledge-base",
    action: "Browse Knowledge",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Internal Service Platform
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Smarter internal IT support,
            <span className="text-blue-400"> powered by AI.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Veridian helps employees resolve IT issues using company policies,
            internal service records, and an AI-powered decision agent.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/agent"
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
            >
              Ask AI Agent →
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              View Operations
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <h2 className="text-xl font-semibold">{feature.title}</h2>

              <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>

              <p className="mt-6 text-sm font-medium text-blue-400 transition group-hover:text-blue-300">
                {feature.action} →
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-sm font-medium text-slate-500">
            HOW THE AGENT WORKS
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Request", "Employee describes an IT issue."],
              [
                "02",
                "Retrieval",
                "Relevant policies and records are retrieved.",
              ],
              [
                "03",
                "Reasoning",
                "AI analyzes the request against the context.",
              ],
              [
                "04",
                "Decision",
                "The validated action is returned to the employee.",
              ],
            ].map(([number, title, description]) => (
              <div key={number}>
                <span className="text-sm font-bold text-blue-400">
                  {number}
                </span>

                <h3 className="mt-2 font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
