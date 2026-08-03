---
title: "Claims Adjudication Rules Engine"
date: 2026-05-10
weight: 3
description: "A deterministic Python rules engine for Malaysian health insurance claims — built as a working POC to prove that the right answer was not an LLM."
summary: "A deterministic Python rules engine for Malaysian health insurance claims — built as a working POC to prove that the right answer was not an LLM."
tags: ["Healthcare", "Python", "Rules Engine", "POC"]
categories: ["Enterprise"]
---

**Client** — third-party administrator, Malaysian health insurance<br>
**Role** — Architect and hands-on builder<br>
**Status** — Working POC delivered against the client's historical claim sample

## The problem

Claims adjudication was manual, slow and inconsistent between assessors. The client came in asking for an AI solution — the assumption being that an LLM would read policy documents and decide claims.

## Why I argued against AI

Adjudication logic in this domain is not ambiguous. Benefit limits, co-payment tiers, pro-ration rules, waiting periods, exclusions — these are written down, deterministic, and auditable by regulation. An LLM would introduce non-determinism into a process that legally requires reproducibility, and would make every denied claim harder to defend, not easier.

The actual bottleneck was that the rules lived across dozens of policy documents and nobody had encoded them.

## What I built

A Python rules engine implementing the client's benefit schedule as executable, testable logic:

- Benefit-limit evaluation with annual and per-incident caps
- Co-payment and deductible tiers
- Pro-ration logic for mid-term policy changes — the hardest rule in the schedule, and the one assessors most often got wrong
- Waiting period and exclusion checks
- Full decision trace on every claim: which rule fired, in what order, against which limit

The trace was the feature that sold it. Every adjudication decision could be explained line by line — something no LLM approach could offer at the time.

## Outcome

The POC processed the client's historical claim sample and surfaced inconsistencies in past manual adjudications. AI stayed in the roadmap, but scoped to where it actually helps: document intake, OCR and structured extraction from unstructured medical bills — feeding the deterministic engine, not replacing it.
