---
title: "AI Voice Agent Call Centre Platform"
date: 2026-07-20
weight: 1
description: "Replacing a human-staffed inbound call centre with a low-latency voice agent stack — LiveKit, Deepgram, RAG grounding and live telephony handoff."
summary: "Replacing a human-staffed inbound call centre with a low-latency voice agent stack — LiveKit, Deepgram, RAG grounding and live telephony handoff."
tags: ["Voice AI", "LiveKit", "RAG", "Pre-Sales", "Enterprise"]
categories: ["Enterprise"]
---

**Client** — logistics technology provider, South Africa<br>
**Role** — Solution architect and pre-sales lead<br>
**Status** — CEO-level proposal with live demo

## The problem

Inbound support volume was growing faster than the client could hire. Call handling was human-staffed, agent turnover was high, and after-hours coverage did not exist. The client wanted "an AI that answers the phone" — which, as usual, was a symptom description rather than a requirement.

Discovery narrowed it down to three things that actually mattered: response latency low enough to feel like conversation, answers grounded in the client's own operational data rather than model priors, and a clean escalation path to a human without the caller repeating themselves.

## Architecture

| Layer | Choice | Rationale |
|---|---|---|
| Telephony | SIP trunk into a real-time media server | Keeps carrier integration decoupled from agent logic |
| Real-time orchestration | LiveKit agents | Barge-in and interruption handling out of the box |
| Speech to text | Streaming ASR with domain vocabulary boosting | Product SKUs and place names are where generic ASR fails |
| Reasoning | LLM with tool calling | Tools for order lookup, booking status, escalation |
| Knowledge grounding | RAG over client SOPs and product data | Prevents confident fabrication on policy questions |
| Text to speech | Streaming neural TTS | First-audio-byte latency is the perceptual bottleneck |
| Handoff | Warm transfer with conversation summary | The caller does not start over |

The design constraint that drove everything was a **sub-1.5 second voice-to-voice latency budget**, allocated explicitly across each hop. Anything slower reads as a bad line and callers start talking over the agent.

## What I owned

- End-to-end architecture and latency budget allocation
- Build-vs-buy analysis across managed voice-agent platforms versus a composed stack
- Commercial model — per-minute unit economics against fully-loaded human agent cost, including the honest version where AI containment rates fall short of vendor claims
- Live demo delivered in a CEO-level meeting
- Risk register: ASR accuracy on accented English, hallucination exposure on policy questions, carrier-side failure modes

## What I would flag to any client considering this

Containment rate is the whole business case, and it is the number vendors are most optimistic about. A pilot scoped to the top five intents will tell you more in three weeks than any RFP response will.
