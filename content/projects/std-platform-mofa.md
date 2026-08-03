---
title: "Science & Technology Diplomacy Platform"
date: 2026-02-01
weight: 4
description: "A national platform for Vietnam's Ministry of Foreign Affairs, built entirely on open-source infrastructure — Keycloak, Supabase, n8n."
summary: "A national platform for Vietnam's Ministry of Foreign Affairs, built entirely on open-source infrastructure — Keycloak, Supabase, n8n."
tags: ["Government", "Open Source", "Platform", "Business Analysis"]
categories: ["Enterprise"]
---

**Client** — Ministry of Foreign Affairs, Vietnam (via CMC Global)<br>
**Role** — Lead business analyst and solution owner<br>
**Status** — PRD, data model and architecture delivered

## Context

A national digital platform to support science and technology diplomacy — connecting institutions, knowledge resources and AI-assisted workflows across Vietnam's diplomatic and research networks.

## The constraint that shaped everything

Government procurement, data sovereignty requirements and long-term maintainability pointed to one conclusion: no proprietary SaaS in the core stack. Every component had to be self-hostable, auditable and replaceable without a vendor conversation.

## Stack

| Concern | Choice |
|---|---|
| Identity and access | Keycloak — SSO, role hierarchy, federation-ready |
| Data platform | Supabase (self-hosted PostgreSQL) — row-level security aligned to organisational roles |
| Workflow automation | n8n — visual workflows that non-engineers on the ministry side can audit |
| Visualisation | globe.gl for network and relationship mapping |

## What I owned

- Requirements elicitation across ministry stakeholders with varying technical fluency
- Full PRD, data model and role/permission matrix
- Architecture decisions and open-source component evaluation
- Workflow design for approval chains and multi-tier review

## Reflection

The interesting engineering problem was not any single component — it was permission modelling. Diplomatic workflows have approval chains that do not map cleanly onto standard RBAC, and getting row-level security to express them without a hand-rolled authorisation layer took several iterations.
