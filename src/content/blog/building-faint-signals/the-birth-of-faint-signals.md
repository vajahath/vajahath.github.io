---
title: "The Birth of Faint Signals: Building a Different Kind of Blog"
description: "The sharp, high-contrast pulse of a digital record, engineered for high-voltage clarity and a 'live' broadcast energy."
pubDate: "2026-04-26"
tags: ["DEVLOG", "DESIGN"]
toc: show
seriesId: "building-faint-signals"
seriesOrder: 1
hotTakes:
  - "Information density is an accessibility feature, not a bug, when used correctly."
  - "Performance is a design requirement, not a technical afterthought."
  - "Static sites are the only logical choice for persistent digital records."
---

I’ve wanted to build my own blog site for a long time. My goal was pretty straightforward: I needed something fast, performant, and easy to maintain, but with a look that didn’t just feel like another WordPress or Blogger template. I wanted a design that felt fresh and unique—something that matched how I actually wanted to record my thoughts and projects.

The result is a "send and forget" personal record. It’s a place for me to document my findings in science, technology, and life without the pressure of a public feed.

This is **faint signals**: a high-density, low-distraction broadcast hub for my digital footprint.

## The Vibe: Broadcast Aesthetics, Laser Focus

I decided on a broadcast-inspired look. I wanted it to be bold and unconventional, packed with information but still very easy to read. To get there, I played around with design ideas until I landed on a high-contrast, black-and-white theme.

The star of the show is Roboto Flex. It’s a variable font that looks great at any resolution and handles light and dark modes perfectly. I spent a lot of time experimenting with the font's slants and weights to create a specific hierarchy. The goal was to make the text really stand out from the background so that even dense articles feel legible and focused.

## The Tech Stack: Why Astro?

Since I’m a Node.js developer, I wanted to stay within that ecosystem. I did some research and looked into Hugo, but after evaluating a few options, I found Astro to be the most interesting fit.

As an Angular developer, I usually work on heavy, state-driven apps, but a blog is all about content. Astro is built for exactly that. It's clean, lightweight, and lets me write everything in Markdown, which makes the whole process of adding new posts feel seamless. I used Gemini and Claude to help me navigate the Astro setup, which saved a lot of time since I didn't have to live in the documentation to get the site running.

## Features

Built a few specific things into the site to help organize my thoughts:

- **Series (The Playlist)**: When I go on a trip—like my journey to Japan—I don't want to cram everything into one giant post. I added support for series so I can group related articles together like a playlist. It’s much easier to follow a story that way.
- **Hot Takes**: I also added "Hot Takes"—short, punchy summaries or thoughts scattered across the site. They work as quick entry points that let you dive into a deeper story if the snippet catches your eye.
- **Tagging**: A simple way to keep everything categorized as the record grows.

## The Philosophy: Content First, Always

My roadmap is simple: **Write**.

**faint signals** is my personal record. It’s a place where thoughts can be wrong, projects can be messy, and the frequency is whatever it needs to be.
