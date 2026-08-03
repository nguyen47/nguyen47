---
title: "The 10x Was Real. It Lasted One Month."
date: 2026-08-03
draft: true
description: "374 commits, 142 days, one developer, two app stores. What the git log actually says about AI-assisted development, once I stopped counting commits."
summary: "374 commits, 142 days, one developer, two app stores. What the git log actually says about AI-assisted development, once I stopped counting commits."
tags: ["AI", "Flutter", "Side Project", "Productivity"]
categories: ["Engineering"]
---

In March I started writing [a Flutter client](/projects/thenextvoz/) for voz.vn, Vietnam's largest tech forum. It has no official public API — the forum runs XenForo and exposes nothing — so the entire data layer is fetch-the-page, parse-the-HTML. As of today, 142 days later:

- **374 commits**, ~**83,000 lines** of hand-written Dart (generated code excluded)
- **34 feature modules**, **29 HTML parsers**, **78 test files**, **897 localised strings**
- Shipped and live on both the App Store and Google Play, currently at 1.4.6
- One person, and most of the code written by AI under my direction

I am not telling this story to brag about velocity. The opposite: I sat down to write a post about *velocity decaying*, opened the git log to get my numbers, and discovered I had misread what was happening to my own project.

## What I thought was happening

The felt experience was unambiguous. Month one was flight — every evening I sat down, every evening a new screen worked. Month two slowed. By month three, small changes were eating whole evenings.

Counting commits confirmed it exactly:

```
March: 154 commits
April:  52
May:    27
```

A 5.7× collapse in three months. The post wrote itself: initial euphoria, then fatigue, then technical debt closing around the throat. Done.

Except there were two more months.

## The git log disagreed

```
June: 85 commits
July: 54
```

There is no decay curve. June tripled May. So I dug further, this time measuring with something other than how often I typed `git commit`:

| Month | Commits | New files | Files touched | % new | Net lines | Del/add | Added per commit |
|-------|---------|-----------|---------------|-------|-----------|---------|------------------|
| March | 154 | 248 | 248 | **100%** | +34,000 | 22% | 285 |
| April | 52 | 41 | 139 | 29% | +7,204 | 41% | 235 |
| May | 27 | 13 | 78 | **17%** | +2,698 | **47%** | 188 |
| June | 85 | 105 | 294 | 36% | +24,985 | 33% | **437** |
| July | 54 | 55 | 257 | 21% | +14,040 | 30% | 373 |

Look at the last column. **A June commit is roughly 1.5× the size of a March commit.** I was not doing less work. I was doing the same work in fewer commits — because later work stopped decomposing into tidy increments.

Commit count measures *how finely work subdivides*, not *how much work happened*. It is a garbage metric, and I nearly built an entire post on top of it.

## The one column that moves in a single direction

Strip out everything that oscillates and one series tells the real story: **new files as a share of all files touched.**

```
100% → 29% → 17% → 36% → 21%
```

March was **100%** — 248 new files out of exactly 248 files touched. Not one line I edited that month was anyone else's, including my own from three weeks prior. No existing constraints, no users, nothing to break.

That is precisely the regime where AI is strongest. It is also precisely the regime in which every "10x faster" number on the internet gets measured.

From April onward, **64% to 83% of the work was editing code that already existed**. Even in the June resurgence: 105 new files, but 294 touched — meaning that to insert the new thing, I had to reopen 189 old ones.

The work did not shrink. It changed type: from **writing** to **integrating**.

## Why the second half is genuinely harder for AI

Not because the model got worse. For three structural reasons:

**New code only has to satisfy a description. Existing code has to satisfy every invisible decision already embedded in it.** There is a line of configuration in my repo that looks inert: the app sends requests to voz.vn with Dart's default User-Agent. An audit pass proposed replacing it with a Chrome-like string — textbook advice, correct in 99% of projects. Here it made Cloudflare return 403 on *every* request including the login page, because a Chrome UA emerging from Dart's TLS stack is a well-known bot signature. What cost me a week to diagnose looks, in a diff, exactly like an arbitrary config line. March had no lines like that. July is full of them.

**New code has a blast radius of zero. Changed code has a radius nobody knows** — and the person who knows it most nearly is me, not the model.

**Verification cost scales with the number of people running the previous version.** Getting it wrong in March meant fixing it. Getting it wrong in July means somebody loses a half-written post.

## The real tax is at the convergence points

This is the part that repaid the archaeology. Rank files by how many commits have touched them:

```
90  thread_detail/presentation/thread_detail_screen.dart
81  l10n/app_localizations{,_vi,_en}.dart        (897 strings)
61  core/router/app_router.dart
49  settings_screen.dart
49  home_screen.dart
46  thread_detail/.../post_card.dart
43  core/constants/storage_keys.dart
```

`thread_detail_screen.dart` appears in **90 of 374 commits**. One commit in four, across the entire project, had to reopen that one file. The router, 61 times. Localisation, 81 — because every feature ends in the same loop of adding strings to both ARB files and regenerating.

This is the actual mechanism behind slowdown, and it has nothing to do with technical debt: **no new feature is free-standing; each one has to thread through a handful of shared chokepoints.** The number of chokepoints does not grow. Traffic through them grows linearly with feature count — so by feature thirty, wiring-into-the-existing-system is larger than building-the-new-thing.

For an agent this is the most expensive ground there is. Every time it edits `thread_detail_screen.dart`, it needs to know why the previous 89 edits did what they did — and it remembers none of them. I remember maybe five, dimly.

## The slowest month was the most valuable one

May: 27 commits, 13 new files, +2,698 lines. On the table it reads as a lazy month.

What actually happened in May: every database table moved to per-account scoping (schema v4), the multi-account lifecycle was completed, each account got an isolated cookie jar, iPad split-view landed, and so did hinge-aware layout for foldables.

It also has the **highest deletion-to-addition ratio of any month: 47%**. Nearly half the effort was tearing out my own earlier code.

No conventional productivity metric rewards May. But without it, multi-account never works, and June never happens.

The general form: **every easy-to-measure metric rewards accumulation and punishes groundwork** — while groundwork is what determines whether you can still move three months later. AI-assisted development sharpens this, because it makes accumulation drastically cheaper while leaving groundwork almost exactly as expensive as it was.

## The skeleton survived; the flesh was replaced

One more number: of the 248 files I created in March, **220 still exist today** — 89%. Even though most of their contents have been rewritten several times over.

Which means: **first-month code is cheap, but first-month boundaries are expensive.**

The split between `core/` and `features/<name>/{data,domain,presentation,providers}`, where parsers live, forcing every HTTP request through exactly one client — those calls were nailed down in week one and are still standing four months later. The line-level quality of March's code turned out to barely matter, because it was all going to be replaced anyway.

From which a usable rule: during the phase where you can vibe most freely, **the only thing worth stopping to think hard about is module boundaries.** It is the only thing you cannot fix later by asking an AI to rewrite it.

## So what to do

**Know which mode you are in, and stop using the wrong process for it.**

*Greenfield mode* (high % new files): open the throttle. Big prompts, long agent runs, light review. Risk is low — nobody is using it and there is nothing to break.

*Integration mode* (low % new files — i.e. from month two onward, i.e. **most of a project's life**): narrow the context, point explicitly at the file to imitate, state the invariants that must not break, write the test first, and read anything touching a convergence point yourself.

**Change what you track.** Drop commit counts. Watch two things:

- **share of work touching existing code** — tells you which mode you are in
- **deletion-to-addition ratio** — tells you whether you are paying debt down or taking more on

**Treat a frequently-touched file as an architectural smell, not a badge.** A file appearing in a quarter of all commits is not "the important file". It is where every feature queues up and waits.

## Closing

The 10x is real. I had it, and it lives in March: 248 files, 34,000 lines, alone, while holding down a full-time job.

But it was measured over the one stretch where the work happened to have exactly the shape AI is best at — new code, no constraints, no users, no convergence points. That stretch lasted a month. The other four were a different job entirely: inserting new things among two hundred existing decisions without breaking any of them.

And there, the advantage shrinks to precisely the extent that you understand your own system.

---

## Appendix: how I got these numbers

Runs on any repo. Adjust the range and paths. The filter matters enormously — counting generated code makes every one of these figures meaningless.

```bash
FILTER=('lib/*.dart'
        ':(exclude)lib/**/*.g.dart'
        ':(exclude)lib/**/*.freezed.dart'
        ':(exclude)lib/l10n/app_localizations*.dart')
```

**Commits per month**

```bash
git log --format='%ad' --date=format:'%Y-%m' | sort | uniq -c
```

**Lines added and deleted per month** — note the half-open range (`--until` is the *first* of the next month), not `-31`, which silently misattributes work in 30-day months

```bash
git log --since=2026-06-01 --until=2026-07-01 --numstat --format='' -- "${FILTER[@]}" \
  | awk '{a+=$1;d+=$2} END {printf "+%d  -%d  net %+d  del/add %d%%\n", a, d, a-d, d*100/a}'
```

**New files versus files touched** — the most important measurement in this post

```bash
# files created during the month
git log --since=2026-06-01 --until=2026-07-01 --diff-filter=A --name-only --format='' \
  -- "${FILTER[@]}" | grep '\.dart$' | sort -u | wc -l

# total distinct files touched during the month
git log --since=2026-06-01 --until=2026-07-01 --name-only --format='' \
  -- "${FILTER[@]}" | grep '\.dart$' | sort -u | wc -l
```

**Convergence points**

```bash
git log --name-only --format='' -- "${FILTER[@]}" \
  | grep '\.dart$' | sort | uniq -c | sort -rn | head -15
```

## Appendix: where to doubt this post

- **n = 1.** One person, one app, one domain. This is a description, not a study.
- **My commit habits changed over time**, which by itself pushes the lines-per-commit figure upward — though that drift is also part of the phenomenon being explained.
- **An HTML-scraping app carries unusually high maintenance load**, because the other side can change its markup whenever it likes and tells nobody. A CRUD app against a stable API would decay more slowly.
- **"% new files" does not distinguish a one-line edit from a full rewrite.** It is a crude measure. I still find it far more honest than counting commits.
