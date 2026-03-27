# Milestone 8 Execution Order

## Purpose

This is the practical coding order for implementing the approved dark background system after the Figma concept is finalized.

Use this with:

- `BACKGROUND_DIRECTION.md`
- `BACKGROUND_FIGMA_CHECKLIST.md`
- `MILESTONE_8_BACKGROUND_REFRESH.md`

## Execution Order

### Step 1 — Finalize Background Tokens

Primary file:

- `app/globals.css`

Tasks:

- apply approved dark page background values
- add any required gradient or glow tokens
- rebalance `surface-card`
- rebalance `surface-soft`
- rebalance border and muted text tokens

Why first:

- everything else depends on the token system

### Step 2 — Update Global Page Shell

Primary files:

- `app/globals.css`
- `app/layout.tsx`

Tasks:

- update body/app shell background behavior
- ensure no unwanted light gaps remain
- verify the new backdrop works across the whole app shell

Why second:

- it gives immediate visibility into whether the background system is actually working

### Step 3 — Align Navbar and Footer

Primary files:

- `components/NavBar.tsx`
- `components/Footer.tsx`

Tasks:

- tune transparency, blur, and border behavior
- ensure nav remains readable on the darker background
- ensure footer feels visually connected

Why third:

- navbar and footer frame every page and quickly reveal contrast problems

### Step 4 — Align Hero and Page Intro Surfaces

Primary files:

- `components/Hero.tsx`
- `components/PageIntro.tsx`
- `app/page.tsx`

Tasks:

- tune hero/background harmony
- remove any clashing gradients or excess glow
- ensure page intro surfaces still stand out clearly

Why fourth:

- these components carry the strongest visual identity

### Step 5 — Rebalance Shared Surfaces and Cards

Primary files:

- `components/ProductCard.tsx`
- `components/SearchAndFilter.tsx`
- `components/ShowcaseSlider.tsx`
- `components/RecentlyViewedRail.tsx`

Tasks:

- verify surfaces still feel elevated
- verify product cards remain distinct
- tune smaller supporting sections against the new backdrop

Why fifth:

- shared components spread the background system consistently across multiple pages

### Step 6 — Validate Commerce-Critical Screens

Primary files:

- `app/products/[id]/page.tsx`
- `app/cart/page.tsx`
- `app/checkout/page.tsx`
- `app/confirmation/page.tsx`

Tasks:

- verify readability of purchase and summary panels
- verify product imagery still reads clearly
- verify checkout and confirmation still feel trustworthy

Why sixth:

- these are the highest-stakes pages in the app

### Step 7 — Validate Auth Screens

Primary files:

- `app/login/page.tsx`
- `app/register/page.tsx`
- `app/forgot-password/page.tsx`
- `app/reset-password/page.tsx`
- `app/verify-email/page.tsx`

Tasks:

- ensure forms remain clear on the darker background
- verify messages, notices, and errors still stand out

Why seventh:

- auth pages are sensitive to contrast and clarity

### Step 8 — Run QA and Validation

Tasks:

- review desktop layout
- review tablet layout
- review mobile layout
- review contrast on major pages
- run targeted lint
- run `npx.cmd tsc --noEmit`

Why last:

- this confirms the background refresh is visually strong and technically safe

## Recommended First Code Batch

If implementing Milestone 8 in phases, start with this exact batch:

1. `app/globals.css`
2. `app/layout.tsx`
3. `components/NavBar.tsx`
4. `components/Footer.tsx`
5. `components/Hero.tsx`

That gives the fastest useful preview of the new background direction before touching every page.

## Stop Points

Pause for review after:

- Step 2 — global shell background
- Step 4 — hero + page intro alignment
- Step 6 — commerce-critical screen review

These are the best checkpoints to compare the result against Figma and avoid over-implementing the wrong direction.
