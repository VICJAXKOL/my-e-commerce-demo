# Background Figma Checklist

## Objective

Design and compare darker background directions in Figma before changing the app background in code.

The goal is to improve:

- visual depth
- premium feel
- card contrast
- overall storefront mood

without hurting:

- readability
- product visibility
- form clarity
- checkout trust

## Setup

- Create a new Figma page: `Background Exploration`
- Duplicate the current key app frames into that page
- Keep all screen content the same while changing only the background system first

## Concepts To Build

### Concept A — Minimal Dark

- deep navy or charcoal base
- no image background
- very soft section contrast only

### Concept B — Dark Gradient Premium

- dark navy to charcoal gradient
- subtle radial blue glow
- soft elevated surfaces

### Concept C — Editorial Dark

- dark base
- abstract blur or faint texture
- stronger visual mood

## Required Frames

Create these frames for each concept:

- `Home`
- `Products Listing`
- `Product Detail`
- `Checkout`
- `Login`

## Background Checklist

For each concept:

- define base background color
- define gradient direction
- define glow/accent placement
- define whether texture is used
- confirm the background does not compete with content

## Surface Contrast Checklist

For each concept, verify:

- cards feel elevated above the page background
- inputs remain easy to see
- buttons still stand out clearly
- hero section feels intentional
- page intro sections remain readable
- footer still feels connected, not disconnected

## Text Contrast Checklist

Check:

- headline contrast
- body text contrast
- muted text still readable
- small helper text still readable
- badge and label contrast

## Product Visibility Checklist

Check:

- product images still feel bright enough
- white/light product images do not disappear into the background
- product cards remain visually distinct
- CTA buttons remain more prominent than the background

## Form UX Checklist

Test background behavior on:

- checkout fields
- login inputs
- forgot-password flow
- contact form

Confirm:

- borders are visible
- placeholder text is readable
- validation/error messages stand out
- the page still feels trustworthy for payment

## Mobile Review Checklist

For each concept:

- preview on mobile-width frames
- confirm glow/texture does not crowd content
- confirm hero still feels balanced
- confirm cards don’t blend into the page
- confirm text remains readable at smaller sizes

## Compare Concepts

When reviewing the three concepts, score each one on:

- premium feel
- readability
- ease of implementation
- consistency with current redesign
- suitability for checkout and auth pages

Use a simple scale:

- `1 = weak`
- `2 = acceptable`
- `3 = strong`

## Recommended Selection Rule

Choose the concept that:

- looks noticeably better immediately
- keeps all key UI surfaces readable
- works across home, product, checkout, and auth
- feels refined without becoming busy

## Recommended First Choice

Start with:

- `Concept B — Dark Gradient Premium`

This should be your first polished prototype before exploring more decorative variants.

## Handoff Notes For Code

Once a concept is chosen, capture:

- hex values for background layers
- gradient direction and stop values
- glow color and opacity
- card/surface contrast guidance
- examples of pages where the background is strongest

## Final Deliverables From Figma

Before implementation, make sure Figma includes:

- final chosen concept
- desktop and mobile variants
- notes on background tokens
- notes on surface/card contrast
- notes on hero and page-shell behavior
