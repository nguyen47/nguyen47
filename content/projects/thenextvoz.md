---
title: "theNextVoz — Flutter Forum Client"
date: 2026-03-20
weight: 10
description: "A third-party mobile client for Vietnam's largest tech forum — live on the App Store and Google Play, built solo."
summary: "A third-party mobile client for Vietnam's largest tech forum — live on the App Store and Google Play, built solo."
tags: ["Flutter", "Dart", "Mobile", "Firebase", "Side Project"]
categories: ["Personal"]
---

**Status** — Shipped and live on both stores<br>
**Platforms** — iOS — [App Store](https://apps.apple.com/app/thenextvoz-community/id6760617755) · Android — [Google Play](https://play.google.com/store/apps/details?id=com.htknguyen.voz)<br>
**Stack** — Flutter, Dart, XenForo API, Firebase Cloud Messaging<br>
**Site** — [thenextvoz.htknguyen.dev](https://thenextvoz.htknguyen.dev/)

## Why

VOZ is Vietnam's largest tech forum and it had no decent mobile experience. Reading it on a phone meant a browser, pinch-zoom and a lot of regret. So I built the client I wanted.

## What it does

- Mobile-optimised reading with full BBCode rendering, code highlighting and inline media
- Post, reply, react, quote, spoiler tags, image attachments
- Private messaging
- Push notifications for quotes, reactions and mentions
- Advanced search — by thread, user and date range
- Bookmarks, dark mode, adjustable typography, Vietnamese and English UI
- Pro tier: multi-account switching, compact mode, draft saving, RSS feed

## Engineering notes

The genuinely hard parts were not the UI:

- **XenForo integration** — session and CSRF handling against a forum with no official public API, staying strictly within the forum's stated rules on request patterns
- **Push notification bridge** — building a VAPID/Web Push to FCM bridge so forum events could reach native devices
- **BBCode rendering** — a full parser and Flutter widget tree, because the forum's dialect includes custom tags no off-the-shelf package handles
- **Rate discipline** — one user tap equals one server request, no prefetching or page-merging, per the forum's explicit rules for third-party clients

## Constraint I chose to respect

The forum administrators published rules for third-party app developers: no server abuse, no advertising, mandatory disclosure that the app is unofficial, and a required support thread. I followed all of them, negotiated directly with the admins on features that touched request volume, and built the monetisation model around a paid tier rather than ads. Shipping something that survives contact with the community it serves matters more than shipping fast.
