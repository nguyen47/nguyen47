---
title: "Edge Facial Recognition & Video Analytics"
date: 2026-01-15
weight: 5
description: "Architecture for edge-based facial recognition scaling to 200+ cameras, plus video analytics and OCR POCs delivered across APAC clients."
summary: "Architecture for edge-based facial recognition scaling to 200+ cameras, plus video analytics and OCR POCs delivered across APAC clients."
tags: ["Computer Vision", "Edge Computing", "NVIDIA Jetson", "Architecture"]
categories: ["Enterprise"]
---

**Clients** — physical security and enterprise operations, APAC<br>
**Role** — Solution architect and pitch lead<br>
**Status** — Architecture and pitch delivered across several pursuits · POCs for video analytics and OCR

## The scaling problem

Facial recognition demos work beautifully with four cameras. At 200+ cameras the architecture that got you the demo collapses — bandwidth, inference cost and latency all break at roughly the same point.

The design answer was to stop shipping video to the model and start shipping the model to the video.

## Architecture

- **Edge inference nodes** — detection and embedding extraction on NVIDIA Jetson class hardware, one node per camera cluster
- **Embeddings, not frames** — only vectors and metadata cross the network, cutting upstream bandwidth by orders of magnitude
- **Central matching service** — vector search against the enrolled identity database
- **Offline-first operation** — nodes continue detecting and buffer results through network partitions
- **OTA model deployment** — model updates rolled out per-cluster with staged rollback

Related engagements extended the same pattern to **video analytics and OCR** — container and vehicle identification for a customs tracking proposal, and document extraction pipelines using detection plus OCR at the edge.

## Commercial dimension

I also owned the licensing model — per-camera AI ID licensing versus per-node versus flat site licence — and built the pitch deck and presentation scripts used in client-facing delivery. On-premise deployment was non-negotiable for most prospects in this space, which ruled out several cloud-native vendors and shaped the competitive positioning.
