---
title: "TinGon — AI Vietnamese News Reader"
date: 2026-04-05
weight: 11
description: "RSS aggregation with AI-driven clustering and de-duplication for Vietnamese news. Flutter, Firebase, Gemini, pgvector."
summary: "RSS aggregation with AI-driven clustering and de-duplication for Vietnamese news. Flutter, Firebase, Gemini, pgvector."
tags: ["Flutter", "AI", "RAG", "Firebase", "Side Project"]
categories: ["Personal"]
---

**Status** — In development · not yet released<br>
**Stack** — Flutter, Firebase, Gemini, pgvector

## The problem

Vietnamese news has a duplication problem. One press release becomes forty near-identical articles across forty outlets within an hour. Any RSS reader that shows you all forty is worse than useless.

## Approach

- Aggregate across Vietnamese news sources via RSS
- Embed each article and cluster by semantic similarity — same story, multiple outlets, one entry
- AI-generated summaries per cluster, with the source list preserved so you can see who covered it and how differently
- Auto-tagging for topic filtering

## What was harder than expected

**Clustering thresholds.** Too tight and you get duplicate clusters for the same story; too loose and two unrelated stories about the same ministry collapse into one. There is no single correct threshold — it varies by topic density and time window. The working solution used time-windowed clustering with topic-adaptive thresholds.

**Vietnamese embedding quality.** Off-the-shelf multilingual embedding models handle Vietnamese unevenly, especially for named entities and compound terms. Evaluating that properly meant building a labelled test set by hand.
