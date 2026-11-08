# Hikari Approved Combat Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expose Hikari's four approved action/defense illustrations inside the Raika website character dialog.

**Architecture:** Keep the existing static HTML and gallery JavaScript. Add four optimized image assets and four entries to each of the two Hikari profile records. No new runtime components.

**Tech Stack:** Static HTML/CSS/JavaScript; Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-11-08-hikari-gallery-design.md`

## Global Constraints

- Preserve the existing Hikari portraits and every other character untouched.
- Preserve the exact approved artwork composition.
- Make all four images visible in the existing responsive selection interface.

## Review Focus

- Missing or broken asset paths.
- Incorrect art order.
- Different variants in family and guard entries.
- Regression in the existing gallery.
- Image payloads unsuitable for mobile access.

## Task 1: Hikari's four existing gallery variants

**Files:**
- Create `tests/hikari-gallery.test.mjs`
- Add `character-variants/hikari-*.webp` (four files)
- Modify `index.html` only in the two Hikari profile objects

- [ ] Write a failing test verifying each Hikari profile contains the four labeled images in order and each asset exists.
- [ ] Run `node --test tests/hikari-gallery.test.mjs` to confirm the missing variants fail.
- [ ] Add verified approved images and the four entries to both Hikari profiles.
- [ ] Run `node --test tests/*.test.mjs` and confirm all pass.
- [ ] Inspect the final Git diff and publish to the existing GitHub Pages main branch.
