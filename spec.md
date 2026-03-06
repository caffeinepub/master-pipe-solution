# Master Pipe Solution

## Current State
- Full website with EN/Bengali toggle, services, contact form, admin panel, worker management
- Admin panel (`/admin`) shows: visit count (raw number), customer queries, default reply
- Backend exposes `getVisitCount()` and `incrementVisits()` but only stores a raw counter (no per-visit data)
- No detailed visitor analytics exist (no device, referral, page, or time data)

## Requested Changes (Diff)

### Add
- Visitor Analytics panel tab inside the Admin Panel dashboard
- Client-side analytics tracking: on every page visit, record and store in `localStorage`:
  - Timestamp
  - Page visited (pathname)
  - Device type (mobile / desktop / tablet, derived from userAgent)
  - Referral source (document.referrer — Direct, Google, WhatsApp, etc.)
  - Time on page (tracked via beforeunload / visibility change)
- Analytics dashboard section in AdminPanel showing:
  - Total visit count (from backend)
  - Visits today / this week (from localStorage log)
  - Device breakdown (pie / bar stats)
  - Referral source breakdown
  - Recent visits list (last 20) with timestamp, device, referral, page, duration
  - "Most viewed page" summary

### Modify
- `AdminPanel.tsx` — add a new "Analytics" tab alongside existing content; analytics data is read from `localStorage` key `mps_visits`
- `App.tsx` — on MainSite load, call a `trackVisit()` utility that appends an entry to `localStorage` (alongside existing `actor.incrementVisits()`)

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/utils/analytics.ts` — `trackVisit()` function and `getVisitLog()` / `clearVisitLog()` helpers; entries stored in `localStorage` as JSON array (capped at 500)
2. Update `App.tsx` to call `trackVisit()` on main site load
3. Add `VisitorAnalytics` component section inside `AdminPanel.tsx` — new tab in the dashboard with stats cards and recent visits table
4. Add deterministic `data-ocid` markers to all interactive surfaces in the analytics panel
