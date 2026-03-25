# MyShop UI/UX Redesign Plan

## Goal

Improve the visual quality, consistency, and usability of the MyShop app by adopting a Figma-first workflow and then implementing the new designs in the existing React/Next.js codebase in phases.

This plan is intentionally practical:

- Design the most important screens first
- Build a small reusable design system
- Refactor the app gradually instead of redesigning everything at once

---

## Why We Are Doing This

The current app is functional, but the UI feels inconsistent across pages and does not yet present a polished store experience.

Main issues observed:

- Home page content is informative, but not visually merchandised like a modern storefront
- Hero section style is stronger than the rest of the site, creating visual inconsistency
- Navigation is crowded and gives too many links equal emphasis
- Product discovery and filters are useful, but feel more utility-driven than premium
- Product detail, auth, and checkout pages work, but need stronger hierarchy and spacing
- Shared styles exist, but the design system is still too loose

---

## Redesign Strategy

We will use a hybrid Figma adoption process:

1. Build a lightweight design system in Figma
2. Redesign the highest-impact screens first
3. Translate approved designs into code
4. Refactor shared components before page-by-page rollout

This helps us improve quality fast without blocking all product work.

---

## Phase Plan

### Phase 1 — Design Foundations

Create a mini design system in Figma that covers:

- Color palette
- Typography scale
- Spacing scale
- Border radius
- Shadows
- Buttons
- Inputs
- Form states
- Cards
- Navigation patterns
- Alert / notice patterns

### Phase 2 — Priority User Flows

Redesign these screens first:

1. Home page
2. Product listing page
3. Product detail page
4. Cart page
5. Checkout page
6. Login / Register / Forgot Password / Reset Password

### Phase 3 — Supporting Screens

Redesign these after the core shopping flow is stable:

- Account
- Orders
- Wishlist
- FAQ
- Contact
- About

---

## Figma File Structure

Recommended Figma page structure:

### 1. Foundations

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Icons

### 2. Components

- Buttons
- Inputs
- Selects
- Pills / badges
- Product cards
- Rating display
- Header / nav
- Footer
- Empty states
- Alerts / banners
- Checkout summary card

### 3. Marketing Screens

- Home
- Categories
- About

### 4. Shopping Screens

- Products listing
- Product detail
- Cart
- Checkout

### 5. Auth Screens

- Login
- Register
- Forgot password
- Reset password
- Verify email

### 6. Notes

- Interaction rules
- Responsive behavior
- Handoff notes

---

## Priority Screen Redesign Notes

### Home Page

Current focus:

- Too text-heavy
- Too many stacked sections with similar card styling
- Not enough visual merchandising or featured shopping entry points

Redesign goals:

- Stronger hero with one main CTA and one secondary CTA
- Featured product or category highlights
- Better separation between promotional content and utility information
- Clear visual rhythm between sections
- More premium storefront feel

Related code:

- `app/page.tsx`
- `components/Hero.tsx`
- `components/ShowcaseSlider.tsx`

### Product Listing

Current focus:

- Functional filtering, but UI feels dense and mechanical
- Product cards could feel more premium and easier to scan

Redesign goals:

- Cleaner filter hierarchy
- Better chip and sort styling
- Stronger product card composition
- More visual emphasis on product image, price, and CTA
- Better empty states

Related code:

- `app/products/page.tsx`
- `components/SearchAndFilter.tsx`
- `components/ProductCard.tsx`

### Product Detail

Current focus:

- Solid information exists, but layout needs more polish
- Key buying info should be easier to scan immediately

Redesign goals:

- Stronger product media layout
- Better purchase panel hierarchy
- Sharper spacing for trust signals and shipping info
- Cleaner related products and review sections

Related code:

- `app/products/[id]/page.tsx`
- `components/ProductMediaGallery.tsx`
- `components/ProductReviews.tsx`
- `components/RelatedProducts.tsx`

### Cart and Checkout

Current focus:

- Checkout is functional but visually dense
- Forms need clearer grouping and more confidence-building structure

Redesign goals:

- Better visual grouping of contact, shipping, and payment sections
- Cleaner summary card and promo section
- Stronger progress cues
- More reassuring payment/trust messaging

Related code:

- `app/cart/page.tsx`
- `components/CartClient.tsx`
- `app/checkout/page.tsx`

### Auth Flow

Current focus:

- Pages are usable but visually generic
- Not enough brand personality or emotional reassurance

Redesign goals:

- Branded auth layout
- Better messaging hierarchy
- Clearer status and help states
- More polished verification and reset flows

Related code:

- `app/login/page.tsx`
- `app/register/page.tsx`
- `app/forgot-password/page.tsx`
- `app/reset-password/page.tsx`
- `app/verify-email/page.tsx`

---

## Design System Tokens To Define

These should be agreed in Figma first, then aligned in code.

### Colors

- Primary brand
- Primary hover / active
- Accent
- Surface background
- Elevated surface
- Border
- Text primary
- Text secondary
- Success
- Warning
- Error

### Typography

- Display
- Page title
- Section title
- Card title
- Body
- Secondary body
- Caption
- Button text

### Spacing

- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48
- 64

### Radius

- Small
- Medium
- Large
- Extra large

### Elevation

- Subtle card
- Hover card
- Modal / sticky panel

---

## Codebase Mapping

These files should become the first implementation targets after Figma approval.

### Global Styling

- `app/globals.css`

This file should evolve into the main token layer:

- colors
- shadows
- radii
- reusable surface styles
- button variants
- input states

### Shared Layout Components

- `components/NavBar.tsx`
- `components/Footer.tsx`
- `components/Hero.tsx`

### Shared Commerce Components

- `components/ProductCard.tsx`
- `components/SearchAndFilter.tsx`
- `components/ProductMediaGallery.tsx`
- `components/ProductRating.tsx`
- `components/ProductBadge.tsx`

### Shared Form Patterns

- auth pages
- checkout fields
- notices / errors / success states

---

## Recommended Implementation Order

### Sprint 1

- Finalize Figma foundations
- Refactor tokens in `app/globals.css`
- Redesign nav, buttons, inputs, cards

### Sprint 2

- Rebuild Home page
- Rebuild Product listing page
- Update Product card and filters

### Sprint 3

- Rebuild Product detail page
- Improve media, purchase panel, trust blocks

### Sprint 4

- Rebuild Cart and Checkout
- Improve order summary and form structure

### Sprint 5

- Rebuild Auth pages
- Polish account-related flows

---

## Success Criteria

We should consider the redesign successful when:

- The app feels visually consistent across all primary screens
- Navigation is easier to understand
- Product browsing feels more premium and more scannable
- Checkout feels simpler and more trustworthy
- Auth pages feel branded and reassuring
- Shared components are reusable and easier to maintain

---

## First Practical Next Steps

1. Create a Figma file using the structure in this document
2. Define foundations first before drawing full screens
3. Design these three screens first:
   - Home
   - Product detail
   - Login
4. Review and approve those screens
5. Start implementation with tokens and shared components

---

## Suggested Working Rhythm

For each redesign cycle:

1. Design the screen in Figma
2. Review for hierarchy, spacing, and usability
3. Approve mobile and desktop behavior
4. Implement in code
5. QA visual consistency against the design

---

## Notes

- Do not redesign every screen at once
- Prioritize consistency over decoration
- Reuse components aggressively
- Use Figma to make decisions before coding
- Keep implementation aligned to tokens, not one-off page styling

