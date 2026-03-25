# MyShop UI Implementation Tasks

## Purpose

This document turns the Figma redesign work into an engineering task list for this codebase.

Use it after:

- `DESIGN_PLAN.md`
- `FIGMA_CHECKLIST.md`

The goal is to help us implement the redesign in an organized way without mixing design decisions and code decisions at the same time.

---

## Working Rules

Before coding any redesign:

- Make sure the relevant Figma screen is approved
- Prefer reusable components over one-off page styling
- Update tokens before updating page layouts
- Keep mobile and desktop behavior aligned
- Avoid redesigning low-priority pages before core flows are stable

---

## Phase 1 — Design Tokens and Global UI

### 1.1 Token Refactor

Primary file:

- `app/globals.css`

Tasks:

- [ ] Finalize color tokens from Figma
- [ ] Finalize text color tokens
- [ ] Finalize surface/background tokens
- [ ] Finalize border tokens
- [ ] Finalize spacing variables if needed
- [ ] Finalize radius values
- [ ] Finalize shadow values
- [ ] Align button styling with approved designs
- [ ] Align input styling with approved designs
- [ ] Align alert styles with approved designs
- [ ] Remove or reduce one-off visual patterns that conflict with the new system

### 1.2 Shared Utility Patterns

Tasks:

- [ ] Standardize section spacing patterns
- [ ] Standardize page container widths
- [ ] Standardize card wrappers
- [ ] Standardize focus styles
- [ ] Standardize empty state styles
- [ ] Standardize status/feedback blocks

---

## Phase 2 — Shared Components

### 2.1 Navigation

Primary file:

- `components/NavBar.tsx`

Tasks:

- [ ] Simplify information hierarchy in desktop nav
- [ ] Improve CTA visibility for cart/account actions
- [ ] Improve spacing and grouping of nav links
- [ ] Redesign mobile nav behavior to match Figma
- [ ] Improve mobile menu readability
- [ ] Ensure auth/account actions are visually consistent

### 2.2 Footer

Primary file:

- `components/Footer.tsx`

Tasks:

- [ ] Redesign footer layout to match updated visual system
- [ ] Improve link grouping and spacing
- [ ] Improve newsletter form styling
- [ ] Reduce visual mismatch with the rest of the app

### 2.3 Hero

Primary file:

- `components/Hero.tsx`

Tasks:

- [ ] Align hero with final home-page design
- [ ] Rework hero CTA hierarchy
- [ ] Ensure hero typography matches token system
- [ ] Ensure mobile layout remains strong

### 2.4 Product Card

Primary file:

- `components/ProductCard.tsx`

Tasks:

- [ ] Redesign image, title, price, and CTA hierarchy
- [ ] Improve spacing and card balance
- [ ] Improve stock and badge placement
- [ ] Improve action button consistency
- [ ] Ensure hover/focus states match design system

### 2.5 Search and Filters

Primary file:

- `components/SearchAndFilter.tsx`

Tasks:

- [ ] Redesign search bar
- [ ] Redesign filter chips
- [ ] Redesign select and input controls
- [ ] Improve layout density and scanability
- [ ] Improve empty state and results summary
- [ ] Improve mobile filter behavior if required by Figma

### 2.6 Supporting Commerce Components

Files to review:

- `components/ProductMediaGallery.tsx`
- `components/ProductReviews.tsx`
- `components/ProductRating.tsx`
- `components/ProductBadge.tsx`
- `components/RelatedProducts.tsx`

Tasks:

- [ ] Align visual styling with Figma
- [ ] Ensure repeated patterns use the same spacing and typography logic
- [ ] Improve consistency between cards, ratings, and review blocks

---

## Phase 3 — Page Implementation

### 3.1 Home Page

Primary files:

- `app/page.tsx`
- `components/Hero.tsx`
- `components/ShowcaseSlider.tsx`

Tasks:

- [ ] Rework page structure to match approved Figma layout
- [ ] Reduce text density
- [ ] Add stronger merchandising sections
- [ ] Improve CTA hierarchy
- [ ] Improve section-to-section pacing
- [ ] Improve mobile stacking behavior

### 3.2 Product Listing

Primary files:

- `app/products/page.tsx`
- `components/SearchAndFilter.tsx`
- `components/ProductCard.tsx`

Tasks:

- [ ] Implement final listing page layout
- [ ] Apply redesigned filters and controls
- [ ] Update product grid spacing
- [ ] Update product cards
- [ ] Improve empty state and helper copy

### 3.3 Product Detail

Primary files:

- `app/products/[id]/page.tsx`
- `components/ProductMediaGallery.tsx`
- `components/RelatedProducts.tsx`
- `components/ProductReviews.tsx`

Tasks:

- [ ] Rework page layout around approved product-detail hierarchy
- [ ] Improve media/gallery presentation
- [ ] Improve purchase panel design
- [ ] Improve trust badges and shipping info section
- [ ] Improve reviews and related products sections
- [ ] Ensure sticky desktop behavior feels intentional

### 3.4 Cart

Primary files:

- `app/cart/page.tsx`
- `components/CartClient.tsx`

Tasks:

- [ ] Redesign cart layout
- [ ] Improve cart item row hierarchy
- [ ] Improve quantity and remove actions
- [ ] Improve summary placement
- [ ] Improve empty cart state

### 3.5 Checkout

Primary files:

- `app/checkout/page.tsx`

Tasks:

- [ ] Redesign overall checkout layout
- [ ] Improve grouping of contact fields
- [ ] Improve grouping of shipping fields
- [ ] Improve summary panel hierarchy
- [ ] Improve promo code area
- [ ] Improve payment reassurance messaging
- [ ] Improve mobile form flow

### 3.6 Auth Flow

Primary files:

- `app/login/page.tsx`
- `app/register/page.tsx`
- `app/forgot-password/page.tsx`
- `app/reset-password/page.tsx`
- `app/verify-email/page.tsx`

Tasks:

- [ ] Create a shared visual structure for auth screens
- [ ] Improve form hierarchy and spacing
- [ ] Improve messaging and reassurance copy placement
- [ ] Improve status, success, and error blocks
- [ ] Improve CTA consistency across auth flows

---

## Phase 4 — Secondary Screens

Files to review:

- `app/account/page.tsx`
- `app/orders/page.tsx`
- `app/wishlist/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/faq/page.tsx`
- `app/returns/page.tsx`
- `app/track/page.tsx`

Tasks:

- [ ] Align layout with updated design system
- [ ] Reuse shared section and card patterns
- [ ] Improve visual consistency with core flows

---

## Responsive QA Tasks

For every implemented screen:

- [ ] Check desktop layout
- [ ] Check tablet layout
- [ ] Check mobile layout
- [ ] Verify text scale and spacing
- [ ] Verify touch target sizes
- [ ] Verify sticky elements do not break mobile layouts
- [ ] Verify alerts and notices remain readable

---

## Suggested Engineering Order

### Milestone 1

- [ ] Update `app/globals.css`
- [ ] Update buttons and input patterns
- [ ] Update `components/NavBar.tsx`
- [ ] Update `components/Footer.tsx`
- [ ] Update `components/ProductCard.tsx`

### Milestone 2

- [ ] Rebuild home page
- [ ] Rebuild product listing

### Milestone 3

- [ ] Rebuild product detail page

### Milestone 4

- [ ] Rebuild cart and checkout

### Milestone 5

- [ ] Rebuild auth flows

### Milestone 6

- [ ] Align secondary/supporting pages

---

## Definition of Done

A redesign task is done when:

- The related Figma screen is approved
- The implementation matches the approved layout and component styling
- Mobile and desktop views are both checked
- Shared styles are reused instead of duplicated
- Lint/build still pass

---

## Immediate Next Build Step

Start with this exact engineering sequence:

1. Update global tokens in `app/globals.css`
2. Refactor navbar and footer
3. Refactor product card
4. Refactor search/filter controls
5. Rebuild home page

That gives the biggest visible improvement early and creates a better foundation for the rest of the redesign.

