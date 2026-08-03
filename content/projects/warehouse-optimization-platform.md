---
title: "Warehouse Optimisation Platform"
date: 2026-06-15
weight: 2
description: "A four-module optimisation platform for a global electronics manufacturer — JIT sequencing, bin allocation, labour planning and trolley routing, with an interactive prototype used to close the strategy phase."
summary: "A four-module optimisation platform for a global electronics manufacturer — JIT sequencing, bin allocation, labour planning and trolley routing, with an interactive prototype used to close the strategy phase."
tags: ["Supply Chain", "Optimisation", "Digital Twin", "Product Strategy"]
categories: ["Enterprise"]
---

**Client** — global electronics manufacturing services provider<br>
**Role** — Solution strategy, PRD authoring, prototype design<br>
**Status** — PRD and interactive prototypes delivered · phased build proposed, not commissioned

## The problem

The client's warehouse operations were running on tribal knowledge and spreadsheets. Throughput bottlenecks were visible in the KPI reports but nobody could attribute them — was it bin placement, picker routing, shift coverage, or upstream sequencing? Without attribution, every improvement proposal was a guess.

## Approach

Rather than pitching one monolithic system, I decomposed the opportunity into four independently valuable modules, each with its own baseline metric and payback case:

1. **JIT sequencing** — align inbound material release with line consumption
2. **Bin optimisation** — slotting by velocity, affinity and ergonomics
3. **Labour planning** — shift coverage modelled against forecast demand
4. **Trolley routing** — pick path optimisation within physical aisle constraints

This structure mattered commercially as much as technically. It gave the client a way to start small, prove one module, and expand — instead of a single procurement decision they would defer for two quarters.

## Deliverables

- Full product requirements document covering all four modules, data dependencies and integration surface (WMS, MES, ERP)
- Interactive React prototypes for each module — clickable enough that stakeholders argued about the right things instead of the colour scheme
- Phased roadmap with per-module baseline metrics and expected payback
- Data readiness assessment: which modules were blocked on data the client did not yet capture

## The honest finding

Two of the four modules were not buildable at the accuracy the client wanted, because the underlying movement data was not being captured at sufficient granularity. That went into the proposal explicitly, with instrumentation as a prerequisite phase. Surfacing that early cost us scope in round one and bought credibility that carried the rest of the engagement.
