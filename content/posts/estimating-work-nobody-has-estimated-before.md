---
title: "Estimating Work Nobody Has Estimated Before"
date: 2026-08-20
description: "Bottom-up estimation assumes you can enumerate the tasks. AI projects break that assumption. How I price the loop instead of the line — and what belongs on page 23."
summary: "Bottom-up estimation assumes you can enumerate the tasks. AI projects break that assumption. How I price the loop instead of the line — and what belongs on page 23."
tags: ["AI", "Pre-Sales", "Estimation"]
categories: ["Industry"]
---

There is a row in one of my old estimates that reads "Prompt engineering & tuning — 15 MD." Every word of it is fiction except the ampersand.

Not because the number was too low, although it was. It is fiction because it is formatted to look like the rows around it — "API integration — 12 MD", "Admin screens — 18 MD" — as if it were the same kind of quantity. It is not. Those rows are tasks. This row is a loop wearing a task's clothes.

My [About page](/about/) says estimates are built bottom-up: WBS, effort, buffer, margin, not a number reverse-engineered from what the client hoped to hear. I stand by that. But bottom-up estimation carries an assumption so old nobody states it anymore: that the work can be enumerated. AI scope breaks that assumption, and most of the AI estimates I see — including my own early ones — deal with the breakage by pretending it did not happen.

## A WBS assumes "done" is observable

Classical estimation works because tasks terminate visibly. The screen renders or it does not. The endpoint returns the payload or it does not. The migration runs. Estimating is the act of decomposing scope until every piece is small enough that you have built something like it before, then summing.

AI work breaks both halves of that. You often have *not* built something like it before — not because the architecture is novel, but because the data is. And "done" is not an event; it is a quality bar. Extraction is never finished. It reaches 91% on the sample you have, and someone has to decide whether the next point is worth two more weeks, and whether the sample even resembles production.

That is the structural difference: **deterministic work is a line, AI work is a loop.** A line has a length. A loop has an iteration count, and the iteration count is precisely the thing you do not know at proposal time. You can enumerate the tasks around the loop — ingestion, schema, deployment, the admin screens. You cannot enumerate the loop itself. Writing "15 MD" on it is not estimating; it is rounding your uncertainty to the nearest number that fits in a cell.

## Where the budget actually goes

Three places, and none of them looks like a task in a WBS.

**Data cleanup.** Unknowable until the client's data arrives, and the client's data always arrives late and worse than described. In a [warehouse optimisation engagement](/projects/warehouse-optimization-platform/), two of the four modules the client wanted were not buildable at the accuracy they wanted, because the underlying movement data was not captured at sufficient granularity. There is no man-day figure that fixes absent data. What that scope needed was not effort but a prerequisite instrumentation phase — which is what we proposed, and which cost us size in round one and bought credibility for the rest of the engagement.

**The measuring stick.** Nobody budgets for building the thing that tells you whether the system works. On the [voice agent platform](/projects/ai-voice-agent-call-center/), the entire business case rests on containment rate — the share of calls the agent resolves without a human. You cannot measure containment without knowing what your calls actually contain, which means labelled transcripts, an intent taxonomy, and agreed definitions of "resolved". That is real work. It appears in almost no vendor estimate I have ever reviewed, mine included, and it is the work that determines whether every other number in the proposal means anything.

**The plateau.** The first 80% of quality arrives in the first week. That week becomes the demo, the demo becomes the client's expectation, and the expectation becomes a number in Appendix B. The remaining points are the actual project, and they get harder non-linearly. In [the satire](/posts/the-tragedy-of-a-software-outsourcing-company/) I wrote about a "95% extraction accuracy" that made it from a Friday-night POC into a contract — it really did hit 95%, on the twelve images that were selected. That is fiction, but the mechanism is not: the plateau is where AI projects go to die, and it is invisible in any estimate built from tasks.

## Estimate the loop, not the task

The constructive move is to stop disguising the loop and price it as what it is. Instead of "Tuning — 20 MD", the row becomes a structure:

- **A quality gate.** The metric, how it is measured, and on what data. "95% extraction accuracy" is not a gate; "≥95% field-level exact match on a 500-document held-out sample drawn from the client's production archive" is.
- **A cost per iteration.** One cycle of error analysis, change, re-evaluation. This *is* estimable — it is ordinary engineering work with a visible end.
- **An iteration cap.** The number of cycles the price includes. Not a guess at how many you will need — a statement of how many the client has bought.
- **Exit criteria, including the honest one.** Gate reached: proceed. Cap reached, gate not reached: here is the number we did reach, here is the error analysis, here is the decision point. "The bar is not reachable with your current data" is a legitimate project outcome, and pricing it as one is the difference between a finding and a failure.

What this produces is the price of an experiment with a capped downside, and I have found clients accept that far more readily than the industry assumes — *provided it is presented as an experiment.* What they do not accept is an experiment that was priced as a certainty, discovered to be an experiment in month four.

## Assumptions are the contract

In the satire, the pre-sales guy writes two assumptions on page 23 and feels much better. Nobody reads page 23. When the client's API arrives in week six bearing no resemblance to its documentation, the PM declines to fight about it, and the assumption dies the quiet death it was always going to die.

On deterministic scope, the assumptions section is protective boilerplate — it exists so that when things go wrong, you can point at it. On AI scope it is load-bearing, because the assumptions are not edge conditions. They are the inputs to the loop. Three belong on the page every time:

1. **A data quality floor**, stated measurably, against a sample actually received before signature. "Client provides clean data" is a wish. "Estimate assumes ≤8% of documents are handwritten, per the 200-document sample reviewed on <date>" is an assumption.
2. **Accuracy as a range tied to a measurement method.** A naked "95%" in a proposal will be read as a promise, quoted back at UAT, and there will be nothing to say. A range with a method is a claim you can defend line by line.
3. **Client-side expert hours.** Labelling, reviewing evaluation output, adjudicating what the correct answer even is. This is the assumption clients break most often, because nobody told their operations team that "buying AI" meant lending it their best assessor two days a week.

The test I apply: **if this assumption breaking would kill the project, it is not an assumption — it is a phase gate.** Move it out of page 23 and into the plan, as paid work whose deliverable is the assumption retired. That is what the instrumentation phase was in the warehouse proposal: an assumption too important to be one.

## The conversation with sales

Then the number comes back too high. It always comes back too high; the competition is quoting three months, and we have AI now.

The move that loses is defending the total, because the total is built on uncertainty and sales can smell it. The move that works is restructuring: split the engagement at the point of maximum ignorance. A feasibility spike — small, fixed-price, a few weeks — that retires the named unknowns: it builds the measuring stick, runs the loop a handful of times on the client's real data, and comes back with an actual number instead of a hoped one. Then a committed build, priced on what the spike found, by people who are no longer guessing.

Everyone's incentives survive contact with this. Sales gets a small number to sell *now*, this quarter. Delivery gets to price the build with data instead of bravado. The client gets a kill point that costs them weeks instead of quarters — which is a feature you can sell, not a hedge you have to hide. On the voice agent engagement I put it in the proposal in exactly those terms: a pilot scoped to the top five intents will tell you more in three weeks than any RFP response will.

Sometimes procurement insists anyway: one fixed number, whole scope, up front. That is not a formality. That is the client telling you which risks they have decided not to own. Price those risks like you are the one holding them — because you are — or decline the deal. Both are better than the third option, which is the satire, played out in real time, with your name on page 14.

## Error bars, written down

An estimate is a model of the project. On deterministic work the model can be precise, and precision is a courtesy. On AI work the honest model has error bars, and the dishonest model has the same error bars — hidden, and discovered at UAT.

Clients do not punish error bars written down. They punish false precision, just later, at the acceptance meeting, at reference-check time, in the eighteen months you spend as the vendor who oversold. The margin an honest estimate protects never appears in the spreadsheet. It is the credibility that prices the second deal.

Somewhere, on a Friday night, a pre-sales guy is trimming a buffer to make a number competitive. The row he should be looking at instead is the one that says "Prompt engineering & tuning — 15 MD". One of those rows is padding. The other one is the project.
