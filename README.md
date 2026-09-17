# Veridian Corp — Internal Service Agent

AI-powered internal IT service platform built as part of the AIONOS AI + Full-Stack Engineering Intern screening assignment.

## Overview

Veridian is an internal IT service platform that helps employees get policy-aware answers to common IT requests.

The system combines:

- A Next.js frontend
- An Express.js REST backend
- MongoDB Atlas with Prisma
- A custom retrieval layer
- Gemini-powered AI reasoning
- Policy validation and structured agent decisions

The agent uses the provided Veridian knowledge base, employee requests, and ticket history as its source of context.

## Core Features

### AI Service Agent

Employees can describe an IT issue in natural language.

The agent:

1. Understands the request
2. Retrieves relevant internal information
3. Sends the contextual information to the AI model
4. Produces a structured decision
5. Validates the decision
6. Returns a concise response with supporting sources

Supported decisions:

- `RESOLVE`
- `INSTRUCT`
- `REQUEST_INFO`
- `ROUTE`
- `ESCALATE`

### Service Operations

The operations dashboard provides visibility into:

- Employee requests
- Ticket queue
- Ticket status
- Active ticket activity

### Knowledge Base

The Knowledge Base page exposes the internal policies used by the service agent.

## Architecture

```text
                    ┌──────────────────────────┐
                    │      Next.js Frontend    │
                    │                          │
                    │  Home                    │
                    │  AI Service Agent        │
                    │  Operations Dashboard    │
                    │  Knowledge Base          │
                    └────────────┬─────────────┘
                                 │
                                 │ REST API
                                 ▼
                    ┌──────────────────────────┐
                    │     Express Backend      │
                    │                          │
                    │  REST API                │
                    │  Agent Orchestrator      │
                    └────────────┬─────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌──────────────────┐      ┌──────────────────┐
          │ Retrieval Layer  │      │  Gemini Service  │
          │                  │      │                  │
          │ KB retrieval     │      │ AI reasoning     │
          │ Request context  │      │ Structured JSON  │
          │ Ticket context   │      │                  │
          └────────┬─────────┘      └────────┬─────────┘
                   │                         │
                   └────────────┬────────────┘
                                ▼
                    ┌──────────────────────────┐
                    │    Decision Validator    │
                    │                          │
                    │ Action validation        │
                    │ Source validation        │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       MongoDB Atlas       │
                    │                          │
                    │ Knowledge Base            │
                    │ Employee Requests        │
                    │ Ticket Queue              │
                    └──────────────────────────┘
```
