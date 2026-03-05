# Master Pipe Solution

## Current State
- Full business website with Hero, About, Services, WhyChooseUs, Contact, and Footer sections
- Bilingual (English / Bengali) toggle
- Contact form that opens WhatsApp on submit
- Backend stores contacts (id, name, phone, message, language) and page visit count
- Floating WhatsApp button (9883004437)

## Requested Changes (Diff)

### Add
- **Admin panel** at `/admin` route (password-protected, hardcoded PIN: `mps@admin`)
- **Query list** showing all submitted contacts: name, phone, message, language, status, timestamp
- **Query status management** -- each query can be marked New / In Progress / Done
- **Default reply message** -- admin can set a global default reply text (stored in backend); when viewing a query, a "Reply on WhatsApp" button pre-fills WhatsApp with the default reply + customer name
- **Contact form timestamp** -- store submission timestamp (Int/Nat) alongside each contact
- Backend: `setDefaultReply(text)`, `getDefaultReply()`, `updateContactStatus(id, status)`, `getAllContacts` returns updated Contact type with status and timestamp

### Modify
- `Contact` type: add `status: Text` (default "new") and `timestamp: Int`
- `submitContact`: capture timestamp at submission
- App.tsx: add route switching between main site and `/admin`

### Remove
- Nothing removed

## Implementation Plan
1. Update Motoko backend: extend Contact type, add status + timestamp, add defaultReply stable var, expose setDefaultReply/getDefaultReply/updateContactStatus
2. Regenerate backend.d.ts bindings
3. Add AdminPanel component with PIN login, query table, status controls, default reply editor, WhatsApp reply button
4. Add simple client-side routing in App.tsx (/admin vs main site)
5. Wire all backend calls in AdminPanel
