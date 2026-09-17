import "dotenv/config";
import express from "express";
import cors from "cors";
import {
  getKnowledgeBase,
  getEmployeeRequests,
  getTickets,
} from "./services/dbService";

import { retrieveContext } from "./agent/retriever";
import { runAgent } from "./agent/agent";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (_req, res) => {
  res.send("VERIDIAN BACKEND IS WORKING");
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Veridian Internal Service Agent",
  });
});

app.get("/api/knowledge-base", async (_req, res) => {
  try {
    const data = await getKnowledgeBase();

    res.json({
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Failed to fetch knowledge base:", error);

    res.status(500).json({
      error: "Failed to fetch knowledge base",
    });
  }
});

app.get("/api/employee-requests", async (_req, res) => {
  try {
    const data = await getEmployeeRequests();

    res.json({
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Failed to fetch employee requests:", error);

    res.status(500).json({
      error: "Failed to fetch employee requests",
    });
  }
});

app.get("/api/tickets", async (_req, res) => {
  try {
    const data = await getTickets();

    res.json({
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Failed to fetch tickets:", error);

    res.status(500).json({
      error: "Failed to fetch tickets",
    });
  }
});

app.get("/api/test-retrieval", async (req, res) => {
  try {
    const query = String(req.query.q || "");

    if (!query.trim()) {
      return res.status(400).json({
        error: "Query parameter 'q' is required",
      });
    }

    const context = await retrieveContext(query);

    res.json(context);
  } catch (error) {
    console.error("Retrieval failed:", error);

    res.status(500).json({
      error: "Retrieval failed",
    });
  }
});

app.post("/api/agent", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "A valid 'message' is required",
      });
    }

    const decision = await runAgent(message);

    res.json(decision);
  } catch (error) {
    console.error("Agent failed:", error);

    res.status(500).json({
      error: "Agent failed to process the request",
    });
  }
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend running on 0.0.0.0:${PORT}`);
});
