# Master Pipe Solution

## Current State
- Public website with EN/Bengali language toggle
- Sections: Hero, About, Services, Why Choose Us, Contact
- Admin panel at `/admin` (PIN: mps@admin) for managing customer queries with status updates and default WhatsApp reply
- Backend: Motoko with Contact management (submit, list, update status, default reply, visit counter)
- WhatsApp floating button (9883004437)

## Requested Changes (Diff)

### Add
- **Worker Management segment** (admin-only, at `/workers`):
  - Employee record: name, age, blood group, emergency contact number, mobile number, rating (1–5), level (Junior/Mid/Senior based on volume of work), zip code
  - Work assignment: assign a job to a worker, recording customer location (address/zip) and worker location (zip) side by side
  - List of all workers with their current assignment status
  - Add / Edit / Delete worker functionality
- **Terms & Conditions section** on main public website:
  - Free repair guarantee if the same problem reappears within 15 days
  - Warranty/guarantee revoked if worker does any back-end deal without business consent; customer loses those benefits
  - Both in English and Bengali
- **Safety & Security Tips** section on main public website (bilingual):
  - For Customers: verification tips, safe payment, what to check after work
  - For Workers (as Non-Compete Clause): no soliciting customers directly, no sharing business info, no independent competing work in the same area
- Backend: Worker CRUD, work-assignment storage

### Modify
- App router: add `/workers` route alongside `/admin`
- Admin panel: add a navigation link to Workers Management
- Navbar: no change needed (admin-only section)

### Remove
- Nothing removed

## Implementation Plan
1. Extend Motoko backend with Worker type (all fields), addWorker, updateWorker, deleteWorker, getAllWorkers, assignWork, getWorkerAssignments
2. Regenerate backend.d.ts bindings
3. Create WorkerManagement component (list, add/edit modal, assignment panel) at route `/workers`
4. Create TermsAndConditions component (bilingual, accordion style)
5. Create SafetyTips component (bilingual, two-column: customer tips + worker non-compete clause)
6. Add T&C and Safety Tips to main site between WhyChooseUs and Contact
7. Add navigation link from AdminPanel to Workers page and back
8. Apply deterministic data-ocid markers to all interactive surfaces
