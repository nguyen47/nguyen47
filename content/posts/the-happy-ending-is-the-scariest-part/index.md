---
title: "The Happy Ending Is the Scariest Part"
date: 2026-11-21
description: "A vibe coder found their Stripe and OpenAI keys sitting in their frontend, fixed it in one evening, and warned everyone. The internet called it a happy ending. Read the fix again."
summary: "A vibe coder found their Stripe and OpenAI keys sitting in their frontend, fixed it in one evening, and warned everyone. The internet called it a happy ending. Read the fix again."
tags: ["AI", "Vibe Coding", "Security", "Opinion"]
categories: ["Engineering"]
---

This week a post on r/TechLeader made the rounds. Someone who describes themselves as "not a dev" built a booking app for their partner's studio over the summer, using Cursor and Claude. Supabase for the backend, Stripe for payments, OpenAI for a little chat helper, Resend for email.

Before launch, spooked by another post about an $88,982 bill, they asked a backend friend to sit with them for an hour. The friend opened devtools and searched the JavaScript bundle. The OpenAI key was in there. So was the Resend key. So was the Stripe secret key, the `sk_live_` one. Plain text, in the files every visitor downloads.

{{< figure src="images/01-reddit-post.jpg" class="mx-auto max-w-md" alt="Screenshot of the r/TechLeader post titled 'I checked my own vibe coded app before launch. I need to warn you about what I found', describing OpenAI, Stripe sk_live_ and Resend keys found in the JavaScript bundle because of the VITE_ prefix." caption="The post on r/TechLeader, part one." >}}

The `.env` file was gitignored, so they thought they were fine. But every variable prefixed with `VITE_` gets baked into the frontend on purpose, and Claude had named them that way so the chat would work from the browser. In their words:

> claude named them that way so the chat worked, and it worked, so i never asked why.

Then the friend checked the server logs: 212 requests for `/.env` in the two weeks the app had been online. Nobody had heard of the app. Bots try it on every site, all day.

That night they rotated all three keys, put a $20 hard cap on OpenAI, moved the OpenAI and Stripe calls into Supabase Edge Functions, and moved their secrets into Infisical. Then they wrote the post, telling everyone to grep their build output for `sk-` and check their spending caps.

{{< figure src="images/02-reddit-post.jpg" class="mx-auto max-w-md" alt="Second screenshot of the post: 212 requests for /.env in two weeks, no spending limit on the OpenAI key, and the fix: rotating keys, a $20 hard cap, Supabase Edge Functions and Infisical." caption="Part two: the probes, and the fix." >}}

The comments loved it. Great PSA. Thanks for sharing. This is why you check before launch.

Everyone read it as a cautionary tale with a happy ending. I read it as a cautionary tale that hasn't ended yet.

## They fixed it the same way they built it

Look at the fix again. The OpenAI call now lives in a Supabase Edge Function, so the browser never sees the key. Good. But who is allowed to call that function?

By default, a Supabase Edge Function checks that the request carries a valid JWT. The anon key is a valid JWT, and the anon key ships in the frontend by design. Unless that function checks for an actual signed-in user and limits how often they can call it, anyone who opens devtools can find the endpoint and use your OpenAI account through it. The key is hidden. The bill isn't.

I don't know whether their function has those checks. That's the point: neither does the post. Nothing in it shows a model of how the system works. It shows a list of things you do: rotate, cap, move to edge function, use a secrets manager, grep for `sk-`. Those are the right moves, but they're answers someone handed over, and nobody explained the question behind them.

They used to vibe code features. Now they vibe code security. They closed the window, left the door open, and wrote a post telling everyone to close their windows.

I'm not saying this to mock them. They did more than most people do, and they did it in public. I'm saying it because the comment section treated this as the lesson learned, and I don't think the lesson has been learned yet.

## "I'm not a dev" is not a disclaimer

The post opens with "i'm not a dev." It's meant as context, maybe as an apology in advance. But the app they built holds a live Stripe secret key for a real business and processes real customers' payments and email addresses.

If you ship software that takes strangers' money, you are a developer. You may not be a good one yet, but you are one. "Not a dev" claims a developer's power without a developer's responsibility, and the toolchain is happy to let you do that.

It matters because the person carrying the risk was never the vibe coder. A leaked `sk_live_` key can issue refunds, read customer data, and create charges. The people exposed are the studio's customers, who booked a class and have no idea how the app was built. A bug in your prototype is your problem. A bug in your product is somebody else's problem, and they never agreed to take the risk.

## The worst kind of junior engineer: one who never says no

Here is the sentence from the post I keep coming back to: *claude named them that way so the chat worked.*

The AI did not make a mistake. It was asked to make the chat work from the browser, and the shortest path to that is putting the key in the browser. It solved the problem it was given, correctly and efficiently.

A decent senior engineer, given the same request, would have said: no, we're not doing that, the key goes on a server. Most of the value of experienced engineers was never in typing code. It was in refusing requests. "We can't store that." "That endpoint needs auth." "Why does the client get to set the price?"

Vibe coding removes exactly that person from the room. You're left with a collaborator that is brilliant, tireless and obedient, and obedience is the last thing you want next to a live payment key.

The most expensive line in that codebase wasn't written by a bad AI. It was written by one that did what it was told.

## No friction, no learning

I learned how environment variables work because a deploy broke. I learned CORS because it ate an afternoon. I'm not nostalgic about those afternoons, but they built a picture of the system in my head, the picture I now use to know where to look.

That's what the backend friend had. They didn't write a single line of code. They opened the network tab and typed `/.env` into the address bar. It took an hour because they already knew where the bodies are usually buried.

Vibe coding takes the pain away, and the lesson goes with it. You end up with a working app and no picture of the system behind it. When something does go wrong, you can't reason your way to the cause. You can only collect more answers from someone who has the picture. That's how you end up with an edge function nobody asked "who can call this?" about.

"It worked, so I never asked why" isn't a confession about one app. It describes the whole method. Visible behavior is the only thing the feedback loop checks. A leaked key doesn't make the app slower. A table without row-level security still renders beautifully. Two hundred bots probing for `/.env` throw no errors. Everything that matters most stays silent until the invoice arrives.

## The industry is selling the not-knowing

Here's where I stop being polite.

The tools are marketed on one promise: you don't need to understand it. Build an app in ten minutes. No coding required. Describe it and ship it. When the app works, the tool gets the credit. When a key leaks and someone gets an $88,982 bill, the story changes: you should have checked, you should have known, you should have read the docs.

They sold "you don't need to understand it" and then billed you for not understanding it.

That's not a user error. It's a business model that keeps the upside and moves the downside onto the user. Every "PSA: check your keys" post on Reddit is a user doing unpaid safety work for a product that told them safety work wasn't their job.

And we only hear from the survivors. The booking-app post exists because someone checked. The $88,982 post exists because someone didn't. Everyone else hasn't posted yet because their invoice hasn't arrived yet.

## So where does that leave the rest of us

It would be easy to end this by looking down on non-developers. I'm not going to, because I don't think I've earned it.

I write most of my code with AI now. Earlier this year [the 10x was real, for about a month](/posts/the-10x-was-real-it-lasted-one-month/), and a lot of that speed came from accepting code that worked without reading it closely. The line between "a developer using AI" and "a vibe coder" isn't a job title. It's whether you stop and ask *why does this work* at the places where money and secrets cross a boundary.

So here's the question I'd put to every developer reading this, myself first: when did you last read, line by line, the AI-written code that sits where a key, a payment, or someone else's data passes through?

Vibe coding doesn't remove the need to understand your system. It just moves the moment you find out you didn't. Usually it's the day someone else finds out first.
