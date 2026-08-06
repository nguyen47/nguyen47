---
title: "The Tragedy of a Software Outsourcing Company (2026 Edition)"
date: 2026-08-06
description: "A fictional nine-month project, from the Friday-night POC to the conditional acceptance nobody wanted. Everyone hits their KPI. Nobody measures what happens after signature."
summary: "A fictional nine-month project, from the Friday-night POC to the conditional acceptance nobody wanted. Everyone hits their KPI. Nobody measures what happens after signature."
tags: ["AI", "Pre-Sales", "Outsourcing", "Satire"]
categories: ["Industry"]
---

{{< alert "circle-info" >}}
**Fiction.** Characters, projects, and numbers are all made up. Written for laughs on a weekend, not aimed at anyone or any project. If it looks like your company — coincidence. Or maybe that's just how this industry works everywhere.
{{< /alert >}}

First, the Sales guy meets the client. Charms them, sells them the dream. Fifteen minutes into the conversation he's nodding along: "We can absolutely do all of this. Let me bring in our Pre-sales guy to go deeper."

The Pre-sales guy gets a four-line brief at 9 PM on a Friday: client wants an internal system with AI, presentation Monday, just put together a deck and a small demo.

"Small demo" means the entire weekend. He vibe-codes a POC: upload an image, AI extracts the numbers, a dashboard with smooth animated charts, plus a chatbot that answers anything in two seconds. The data is twelve hardcoded rows. But it looks good. It runs. It even has a loading animation.

Monday's presentation. The client is impressed. Their VP turns around: "You guys move fast — three days for this?" Sales beams: "That's AI for you, sir. Multiplies our productivity."

The Pre-sales guy sits at the far end of the table. He almost says something. He doesn't.

The client nods and asks for a detailed proposal with pricing.

He does the estimate first: 5 months, 6 people. Sales looks at the number and sighs. "Man, the competition is quoting three months. And we have AI now — go back and redo it, trim the buffer, we need to be competitive." He cuts integration effort, cuts the UAT buffer, lands on 3.5 months. Sales rounds it down to 3.

At the bottom of the estimate he writes two assumptions: the client provides API access to their existing system within the first two weeks, and scope does not change after sign-off. Writing that down makes him feel much better.

Then he pulls up the recording from the client meeting, dumps the transcript into a chat window, asks for an SRS, and staples the estimate onto it. Thirty minutes later: an 80-page proposal. Executive Summary. Business Context. Non-Functional Requirements broken into seven subsections. A RACI matrix. A 24-row Risk Register in which risk #18 reads "Risk of misunderstanding business requirements — Mitigation: increase communication with the client." His two assumptions sit on page 23.

Nobody reads the whole thing. Sales reads the pricing section. The Pre-sales guy re-reads the six pages he actually wrote himself. The client prints it, spiral-binds it, and drops it on their director's desk. The director picks it up, gauges the thickness with his thumb, and nods: "These guys are thorough."

Meanwhile HR starts hiring. Four devs this time instead of six, because somebody forwarded a LinkedIn post into the leadership group claiming one developer plus AI equals two and a half developers.

Client signs. Pays 30% upfront. Sales takes his 5% cut of that 30% — good month. The Pre-sales guy gets a "nice work" and a new brief. Presentation Thursday.

The team lead and the senior dev sit down to break down requirements and size the work. The team lead does the math: with these requirements, assuming absolutely nothing changes, eight months.

The PM goes quiet for a moment. He knows eight months is right. But the contract says three, and his KPI this year is on-time delivery rate. So he says: "I hear you. But we've got Cursor Business now. Just start — deliver well and I'll make sure you get project bonus." He doesn't fully believe what he just said either.

The team lead opens the proposal. He stops at page 14 and messages the Pre-sales guy: "Where did '95% AI extraction accuracy' come from?" The answer: "It really did hit that in the demo." It really did — on the twelve images that were selected. The conversation ends there. Page 14 is already in the contract, Appendix B, Scope of Work.

The team lead assigns people, splits tasks, sets up the scrum ceremonies, and rallies the room: "Two and a half months, team. Half a month of buffer."

Month one, the velocity is glorious. A junior pushes 3,000-line PRs daily. The burndown chart falls off a cliff. The PM screenshots it for the company group chat. The senior dev can't review fast enough and starts approving on vibes. Test coverage hits 85% — all AI-generated tests, asserting the mocks rather than the business logic.

Also in month one: the client's API doesn't exist yet. Their IT team says it needs security approval. The team builds mocks and keeps going.

After a month, one dev quits. HR hires a replacement, and the PM pulls a dev off another project to help.

A month later they discover the AI misread a domain term in the SRS — the client uses a word that differs from the industry standard. The misreading has spread across 40 files, because every time a junior hit an error they pasted the whole stale context back into the chat. Meanwhile the client has seen some startup's demo and wants a chatbot added, for modernity. The team lead pushes back. The client opens his laptop and replays the POC from three months earlier: "But you already have this?" Nobody can explain that "this" was forty lines of API calls and a hardcoded array of answers.

Week six, the client's API arrives. The format bears no resemblance to the documentation they sent originally, and three required fields are missing. The entire data access layer, built against mocks, has to be rewritten. The team lead pulls up page 23. The PM reads it and says: "Just do it. Fighting about it now sours the relationship — we'll bundle it into a change request at the end." Nobody ever files it.

Another month in, the project has failed perfectly. Not from too little code — from too much. Two hundred thousand lines for a system that should have been forty thousand. Three architectural patterns coexisting because three people prompted three different ways. The team lead jumps in to code alongside the two juniors, because the senior dev is in the hospital with tuberculosis.

The team lead reads the juniors' code and doesn't understand it. He asks the juniors. They don't understand it either. All they know is: "I told it to fix it and it fixed it."

The PM pulls two more devs off another project. They need three weeks to onboard — longer than it used to take — because there's nobody to ask *why is it done this way here*. Nobody knows. The author was a model, and its context window was cleared back in month two.

Month five, the client's security team runs a scan on staging: API keys hardcoded in six places, a package in `package.json` that doesn't exist on npm (the AI invented the name, and someone else has since registered it), and an admin endpoint with no role check because the AI assumed middleware handled it upstream.

Then comes the scope meeting. Both sides pull out the 80-page document. The client points at page 31: *the system synchronizes data in real time.* The team lead flips to page 62: *data synchronization runs in batches, four-hour default interval.* Both sentences are in the contract. Both were written by the same model, thirty pages and roughly four minutes apart, and nobody had ever read those two pages in the same sitting.

The Pre-sales guy is summoned to the meeting in the role of technical credibility, meaning he sits there saying things like "we need to re-align on the architecture to ensure long-term scalability," trying to make a three-month delay sound like a strategic decision. Then he flies out to pitch another client, with a deck containing a slide titled *Proven Delivery Track Record*, illustrated with a screenshot of the old POC.

By month six, the Sales guy has moved to another company. New title: AI Solutions Consultant. The PM is still negotiating extensions with the client. The senior dev is out of the hospital and has been back on overtime for a week. Everyone else is still coding and debugging. The team lead takes the occasional half-day off for interviews somewhere.

By month seven, there's a demo the client can look at. UAT is scheduled for two weeks — precisely the number the Pre-sales guy cut from the estimate.

UAT runs five weeks. The client logs 340 bugs. The team fixes 180, closes 60 as "as designed," and pushes the remaining 100 to phase two — a phase that does not exist.

By month eight, the client signs a conditional acceptance and pays 40% of the project cost to receive a pile of source code that "works if you click the buttons in the documented order," along with a declaration that they will never work with this vendor again — and a line that stings more: "I could have gotten this far sitting with an AI myself." The Pre-sales guy hears about it secondhand from the PM. He understands the client's feeling with total precision, because that is exactly what he did over a weekend in January.

The final 30% is tied to a warranty acceptance clause after three months in production. The client never signs it. The company never chases it either, because chasing it would mean reopening the 80-page document.

By month nine, the two junior devs are let go for insufficient skills and poor productivity. In reality, the company has discovered that a junior plus AI is still a junior, just faster. Leadership decides to cut fresher hiring next year. Nobody asks where the seniors will come from in five years.

At quarter close, the PM gets his project bonus as usual, because his on-time delivery rate is measured against the final extended deadline — which he proposed. The team lead has left to start his own company selling AI Transformation services to SMEs. The senior dev is somewhere else at double the salary, with a job description that reads *code review and AI output validation*. HR keeps hiring devs to fill the gaps.

The Pre-sales guy gets promoted. His win rate that quarter was 60%, the highest in the company. Nobody measures what happens after signature.

The company doesn't go bankrupt. Next quarter it wins more deals, lands new clients, and somewhere a Pre-sales guy is vibe-coding a POC on a Friday night.

Only faster this time. AI, you know.

---

*Reading this back, I was probably harsh on the Sales and PM crowd. In real life everyone is doing their best inside a measurement system that measures the wrong things. The Pre-sales guy included.*
