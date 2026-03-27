# Milestone 8 — Background System Refresh

## Purpose

Milestone 8 introduces the approved darker background direction from Figma into the app without damaging readability, product visibility, or checkout trust.

This milestone should happen after:

- `BACKGROUND_DIRECTION.md`
- `BACKGROUND_FIGMA_CHECKLIST.md`
- final Figma approval of the chosen background concept

## Goal

Replace the current page backdrop with a more premium dark background system that:

- improves visual depth
- makes surfaces feel more elevated
- helps product cards and CTAs stand out
- keeps content readable across storefront and checkout flows

## Primary Files To Review

- `app/globals.css`
- `app/layout.tsx`
- `components/Hero.tsx`
- `components/NavBar.tsx`
- `components/Footer.tsx`
- `components/PageIntro.tsx`
- `app/page.tsx`
- `app/products/page.tsx`
- `app/products/[id]/page.tsx`
- `app/checkout/page.tsx`
- `app/login/page.tsx`

## Token Tasks

- [ ] Replace the current page background token with the approved dark value
- [ ] Add gradient/background-layer tokens if needed
- [ ] Add glow/accent tokens only if approved in Figma
- [ ] Rebalance `surface-card` against the darker page background
- [ ] Rebalance `surface-soft` against the darker page background
- [ ] Adjust border subtle/strong tokens for dark context
- [ ] Recheck muted text tokens for readability

## App Shell Tasks

- [ ] Apply the new background system to the global body/app shell
- [ ] Ensure page wrappers do not create accidental light gaps
- [ ] Ensure the navbar still feels integrated on top of the darker background
- [ ] Ensure footer feels visually connected rather than disconnected

## Hero and Section Tasks

- [ ] Align hero background treatment with the chosen background concept
- [ ] Avoid stacking too many competing gradients/glows in one view
- [ ] Recheck section spacing so dark backgrounds feel calm, not heavy
- [ ] Ensure PageIntro sections still stand out clearly

## Surface Contrast Tasks

- [ ] Verify cards remain clearly elevated
- [ ] Verify product cards do not blend into the page background
- [ ] Verify summary panels remain readable
- [ ] Verify input controls still look interactive
- [ ] Verify secondary buttons remain visible on darker surroundings

## Critical Screen QA

Check these first after implementation:

- [ ] `Home`
- [ ] `Products Listing`
- [ ] `Product Detail`
- [ ] `Cart`
- [ ] `Checkout`
- [ ] `Login`
- [ ] `Register`
- [ ] `Order Confirmation`

## Readability QA

- [ ] Verify headline contrast
- [ ] Verify body text contrast
- [ ] Verify muted text contrast
- [ ] Verify form placeholder readability
- [ ] Verify alert and status block readability

## Commerce-Specific QA

- [ ] Ensure checkout still feels trustworthy
- [ ] Ensure payment summary still stands out
- [ ] Ensure confirmation page hierarchy still reads clearly
- [ ] Ensure product imagery remains visible against the new background

## Responsive QA

- [ ] Review desktop layout
- [ ] Review tablet layout
- [ ] Review mobile layout
- [ ] Check glow/texture behavior on smaller screens
- [ ] Ensure the darker background does not cause visual crowding on mobile

## Validation

Before closing Milestone 8:

- [ ] Run targeted lint for changed files
- [ ] Run `npx.cmd tsc --noEmit`
- [ ] Review contrast manually on the most important screens

## Definition of Done

Milestone 8 is done when:

- the approved Figma background concept is implemented
- global background and surfaces feel visually coherent
- core commerce and auth flows remain readable
- mobile and desktop both feel intentional
- lint and type checks pass
