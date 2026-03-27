# Background Direction

## Goal

Shift the app toward a more premium visual mood by replacing the current light page backdrop with a darker, more intentional background system designed first in Figma, then translated into code.

This should:

- make product cards and CTAs stand out more
- improve the perceived polish of the storefront
- create stronger contrast between page background and surface components
- stay readable, calm, and trustworthy for shopping flows

## Design Direction

The recommended direction is a **dark gradient system** rather than a flat black background or a busy image.

Why:

- flatter and safer than a photo background
- more premium than a plain solid color
- easier to implement consistently across pages
- less likely to hurt readability or product-image visibility

## Recommended Visual Style

### Base palette

- deep navy
- charcoal
- slate-blue
- soft electric-blue accents

Suggested mood:

- elegant
- modern
- calm
- high-contrast without feeling harsh

### Background treatment

Use layered backgrounds in Figma:

1. **Base layer**
   - deep dark navy / charcoal fill

2. **Gradient layer**
   - subtle diagonal or vertical gradient
   - example direction: top-left slightly brighter, bottom-right deeper

3. **Ambient glow layer**
   - soft radial blue glow behind hero or key sections
   - low opacity only

4. **Optional texture layer**
   - very subtle noise or blurred abstract shapes
   - use only if it does not compete with cards and text

## Figma Concepts To Explore

Create 3 quick background concepts in Figma:

### Concept A — Minimal Dark

- solid dark navy background
- light surface cards
- very subtle section separation

Best for:

- maximum readability
- easiest implementation

### Concept B — Dark Gradient Premium

- deep navy to charcoal gradient
- soft blue radial glow
- elevated cards with gentle borders/shadows

Best for:

- premium feel
- likely best overall choice

### Concept C — Editorial Dark Atmosphere

- dark base
- abstract blurred shapes or faint texture
- stronger visual character

Best for:

- stronger brand personality

Risk:

- can become visually noisy if overdone

## Figma Frames To Design

Apply each concept to these frames:

1. `Home`
2. `Products Listing`
3. `Product Detail`
4. `Checkout`
5. `Login`

This is enough to test whether the background works across:

- content-heavy pages
- product-focused pages
- form-heavy pages

## Components To Re-evaluate In Figma

Once the darker background is applied, review:

- navbar transparency / blur
- hero section contrast
- page intro sections
- product cards
- form fields
- summary cards
- footer
- button contrast
- badges and muted text

## Contrast Rules

The darker background should keep:

- strong contrast for headings
- comfortable contrast for body text
- clear separation between page background and cards
- visible input borders
- obvious CTA priority

Avoid:

- pure black everywhere
- low-contrast gray text on dark backgrounds
- decorative background textures behind forms
- strong glows that reduce legibility

## Code Translation Plan

Once a concept is chosen in Figma, implement it in this order:

1. update background tokens in `app/globals.css`
2. adjust global body/page background
3. refine `surface-card` and `surface-soft`
4. align navbar and hero with the new backdrop
5. test product cards, forms, and checkout summaries
6. review dark/light balance across all redesigned pages

## Suggested Token Direction

These are not final values — just a starting direction for Figma and later code work:

- page background: deep navy / charcoal
- elevated surface: slightly lighter blue-gray
- soft surface: muted slate
- border subtle: cool translucent blue-gray
- accent glow: restrained blue/cyan

## Decision Criteria

Choose the background concept that:

- makes the app feel more premium immediately
- keeps cards readable and elevated
- improves product-image presentation
- does not make checkout or auth feel heavy
- works equally well on desktop and mobile

## Recommendation

Start by designing **Concept B — Dark Gradient Premium** in Figma.

That is the most likely to:

- elevate the app visually
- preserve clarity
- fit the redesign work already completed
- translate cleanly into CSS tokens and reusable surfaces

## Next Step

After the Figma concept is chosen, the next implementation step should be:

`Milestone 8 — Background System Refresh`

That milestone should cover:

- global background tokens
- body/app shell background
- hero/background harmony
- surface tuning for cards and forms
- final contrast QA
