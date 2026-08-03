---
title: "Muc & Dem — Automated Storytelling Video Pipeline"
date: 2026-06-29
weight: 12
description: "A Vietnamese audiobook and storytelling YouTube channel with a programmatic video engine — sprite-based animation, TTS narration, Remotion rendering."
summary: "A Vietnamese audiobook and storytelling YouTube channel with a programmatic video engine — sprite-based animation, TTS narration, Remotion rendering."
tags: ["Remotion", "TTS", "Content Automation", "Side Project"]
categories: ["Personal"]
---

**Status** — Engine built and rendering · channel not launched<br>
**Stack** — Remotion, ElevenLabs TTS, sprite-based animation engine

## The idea

A Vietnamese storytelling and audiobook channel — but produced programmatically rather than hand-animated, so the marginal cost of the next episode approaches zero.

## The engine

I designed a sprite-based video engine around three ideas:

- **ECP model** — entity, component, property separation so scenes are described as data rather than hand-placed elements
- **AnchorResolver pattern** — sprite positioning resolved against named anchors, so a scene layout survives asset changes
- **Remotion rendering** — React components as video frames, with the whole composition driven by a script file plus a timed narration track

Narration is TTS-generated, timed against the script, and drives sprite state transitions automatically.

## The honest assessment

Remotion solves the rendering bottleneck completely. But rendering was never the bottleneck — **writing was**. A channel like this is constrained by how fast you can produce good scripts, and no amount of pipeline automation moves that number. The engine was worth building; it just did not unlock what I expected it to.

The same infrastructure is far better matched to data-driven content, where the input is a feed rather than a person's imagination. Roughly 80% of the codebase transfers directly to that use case.
