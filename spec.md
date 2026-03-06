# Master Pipe Solution

## Current State
The admin panel has a Visitor Analytics section (Analytics tab) that shows:
- Total visits count (from backend)
- Visits today / this week (from localStorage log)
- Top referral source
- Device breakdown (mobile/tablet/desktop)
- Traffic sources (referral breakdown with bars)
- Recent visits table (timestamp, page, device, referral, duration)
- Clear analytics button

Each visit entry in localStorage already stores `page` (the URL pathname). The analytics.ts utility tracks the page pathname per visit.

## Requested Changes (Diff)

### Add
- **Page-level breakdown section** in AnalyticsPanel: a card showing which website sections/pages received the most visits, with counts and percentage bars. Pages to label: `/` = Home, `/admin` = Admin Panel, `/workers` = Worker Management, any other path = its raw pathname.

### Modify
- `AnalyticsPanel` component in `AdminPanel.tsx`: add a new "Pages" card between Device Breakdown and the Recent Visits table (or in a new grid row), computing page-level counts from the visit log.

### Remove
- Nothing removed.

## Implementation Plan
1. In `AdminPanel.tsx`, inside `AnalyticsPanel`, compute a `pageMap` from the existing `log` array (count visits per `entry.page`).
2. Sort pages descending by visit count.
3. Add a label map: `{ "/": "Home", "/admin": "Admin Panel", "/workers": "Workers" }`.
4. Render a new Card with the title "Pages" and a bar chart list (same style as Traffic Sources), placed in the 2-column grid alongside the existing Device/Referral cards or as a standalone full-width card.
5. Use `data-ocid="analytics.pages.panel"` on the container.
6. Empty state: if log has no entries, the empty state already handles it (no change needed).
