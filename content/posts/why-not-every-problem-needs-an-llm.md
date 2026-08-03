---
title: "Not Every Problem Needs an LLM"
date: 2026-08-03
description: "Notes on talking clients out of AI, and why deterministic logic still wins in regulated domains."
summary: "Notes on talking clients out of AI, and why deterministic logic still wins in regulated domains."
tags: ["AI", "Architecture", "Pre-Sales"]
categories: ["Architecture"]
---

The most useful thing I do in a discovery workshop is occasionally talk the client out of the thing they came to buy.

This is not contrarianism. It is that the request arrives pre-shaped by the budget line it was approved against. Someone has an AI initiative to spend, so the problem gets described as an AI problem, and by the time it reaches a solution architect it has already been framed in a way that forecloses the better answer.

## The request is downstream of the budget

A third-party administrator in Malaysian health insurance came to us wanting AI for claims adjudication. The framing was specific: an LLM would read the policy documents and decide the claims. Adjudication was manual, slow, and inconsistent between assessors — all true, all worth fixing.

But adjudication logic in that domain is not ambiguous. Benefit limits, co-payment tiers, pro-ration rules, waiting periods, exclusions — these are written down. They are deterministic. They are auditable by regulation. The inconsistency between assessors was not evidence that the rules were fuzzy; it was evidence that nobody had encoded them.

The bottleneck was never comprehension. It was that the rules lived across dozens of policy documents in the heads of people who had read them.

## Non-determinism is a liability, not a feature

In a regulated domain, every decision has to be defensible line by line. Someone denies a claim, the claimant disputes it, and the organisation has to reconstruct why — which rule fired, against which limit, in what order.

An LLM makes that harder in both directions. You get non-reproducibility on a process that legally requires reproducibility, and you get an explanation that is generated after the fact rather than being the actual mechanism of the decision. A plausible-sounding rationalisation is worse than no rationalisation, because it survives review.

What we built instead was a Python rules engine implementing the benefit schedule as executable, testable logic. The feature that sold it was not accuracy — it was the decision trace. Every adjudication could be replayed rule by rule. Run against the client's historical claim sample, it surfaced inconsistencies in past manual decisions, which is a thing you can only do when the logic is inspectable.

## Where the AI actually went

AI stayed in the roadmap. It moved to where it earns its non-determinism: document intake, OCR, structured extraction from unstructured medical bills. Messy input, tolerant of error, cheap to verify, with a human or a schema check downstream.

That is the general shape. **Deterministic core, AI at the edges.** The model handles the part where the input is unstructured and the failure mode is "try again". The engine handles the part where the output has to be defended in front of a regulator.

It is worth being precise about which side of that line a given step falls on. "Extract the diagnosis code from this bill" is an edge problem — verifiable against a code list. "Decide whether this diagnosis is covered under a policy in its waiting period" is a core problem. They look adjacent in a workflow diagram and they are not remotely the same risk.

## What the pattern looks like in discovery

The claims engagement was not unusual. The same shape recurs:

The client asks for AI because AI is what they have budget for. Discovery reveals the binding constraint is data capture, process inconsistency, or integration — none of which a model fixes. In a warehouse optimisation engagement, two of four proposed modules were not buildable at the accuracy the client wanted, because the underlying movement data was not being captured at sufficient granularity. No model architecture recovers information that was never recorded.

So the question I try to get answered before anything else: **what is the actual constraint, and would a perfect model relax it?** If a hypothetical oracle with perfect judgement still would not fix the problem, the problem is not a judgement problem.

## The commercial part

The obvious objection is that this is a bad way to sell software. Telling a client their AI project should be a rules engine and a data instrumentation phase is a smaller first invoice than telling them yes.

It is a smaller invoice. It costs scope in round one. I have made that trade repeatedly and it has been correct every time, for a reason that has nothing to do with virtue: the alternative is a project that dies in UAT. A deal that gets right-sized at discovery costs everyone a fraction of what a deal that fails acceptance costs — in margin, in reference value, in the eighteen months you do not spend as the vendor who oversold.

Clients also notice. A vendor who says "not this part" is making a claim you can check, and the parts they do say yes to become more believable. Most of the pipeline I have closed came after a conversation where I argued against something.

The engineering version of the same principle: the right answer is sometimes a deterministic rules engine, and being the person who says so out loud is worth more than being the person who ships the demo.
