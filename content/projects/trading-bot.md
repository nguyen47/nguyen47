---
title: "Multi-Strategy Algorithmic Trading System"
date: 2026-01-10
weight: 13
description: "A Node.js futures trading bot built for my own use — multi-strategy ensemble with macro regime detection, backtesting and ML-based signal scoring."
summary: "A Node.js futures trading bot built for my own use — multi-strategy ensemble with macro regime detection, backtesting and ML-based signal scoring."
tags: ["Node.js", "Quantitative", "Machine Learning", "Side Project"]
categories: ["Personal"]
---

**Status** — Personal system, run privately · not a product and not offered to anyone<br>
**Stack** — Node.js, Binance Futures API, XGBoost, LSTM

## What it is

A swing trading system running an ensemble of strategies rather than a single edge:

- Trend following, mean reversion and breakout strategies running concurrently
- **Macro regime detection** — the ensemble weights each strategy by detected market regime, because a mean-reversion strategy in a trending regime is a reliable way to lose money slowly
- ML-based signal scoring to filter low-conviction entries
- Full backtesting harness with walk-forward validation

## What I actually learned

Most of the engineering effort went somewhere unglamorous: **avoiding lookahead bias in the backtester.** It is trivially easy to write a backtest that produces a beautiful equity curve because it quietly uses information that would not have been available at decision time. Every version of that bug looks like a discovery until you fix it.

The second lesson: position sizing and risk limits contribute more to outcomes than signal quality does. A mediocre signal with disciplined sizing outperforms a good signal without it.

Built for my own use — not investment advice, and not offered as a product.
