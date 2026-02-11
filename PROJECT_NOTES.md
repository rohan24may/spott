```md
# 📁 Project Structure — Quick Explanation

This document explains what each main folder does in a simple and short way for future reference.

---

# 📁 /app

Controls routing, pages, and navigation of the entire application.

Each folder = a route.

Examples:
- `app/page.js` → homepage `/`
- `app/explore/page.jsx` → `/explore`
- `app/my-tickets/page.jsx` → `/my-tickets`

### Special naming
- `(folder)` → only for organizing, not part of URL  
- `[slug]` or `[id]` → dynamic routes (changes based on data)

### Main sections
- **(auth)** → login & signup pages  
- **(main)** → logged-in user features (create events, tickets, dashboard)  
- **(public)** → public browsing pages (explore, event details)  
- **api/** → backend routes (AI event generation)

Root files:
- `layout.js` → global wrapper (auth + convex + theme + header/footer)
- `page.js` → homepage
- `globals.css` → global styles

---

# 📁 /components

Reusable UI components used across pages.

Examples:
- `header.jsx` → navigation
- `footer.jsx` → bottom section
- `event-card.jsx` → event display card
- `onboarding-modal.jsx` → first-time user setup
- `convex-client-provider.jsx` → connects frontend with Convex
- `theme-provider.jsx` → dark/light mode

Purpose:
Reuse UI instead of rewriting it.

---

# 📁 /convex

Backend of the app.

Handles:
- database
- users
- events
- registrations
- queries & mutations

Key files:
- `schema.js` → database structure
- `users.js` → user logic
- `events.js` → event logic
- `registrations.js` → ticket booking logic
- `auth.config.js` → connects Clerk auth with Convex

Flow:
Frontend → Convex → Database → Response → UI

---

# 📁 /hooks

Custom React logic used across the app.

- `use-convex-query.js` → fetch data from Convex
- `use-onboarding.jsx` → onboarding flow
- `use-store-user.jsx` → store user after login

Purpose:
Keep logic reusable and clean.

---

# 📁 /lib

Helper utilities and constant data.

- `data.js` → categories/constants
- `location-utils.js` → location helpers
- `utils.js` → general helper functions

Used to support app logic.

---

# 🧠 Overall Flow

Public users:
→ explore events  
→ open event pages  

After login:
→ onboarding  
→ create events  
→ book tickets  
→ manage events  

Convex handles backend.
Next.js handles frontend.
Clerk handles authentication.
```
