
# 🚀 Spott

Spott is a modern event discovery and management platform built with **Next.js, Convex, and Clerk**.  
It allows users to explore events, create their own, register for tickets, and manage everything in one place with a fast, real-time experience.

---

## ✨ Features

- 🔐 Authentication with Clerk (Google + email)
- 🧠 Personalized onboarding (interests + location)
- 📍 Discover nearby events
- 🎟 Event creation & ticket registration
- 📊 Manage created events and attendees
- 📱 QR-based ticket viewing & validation
- ⚡ Real-time backend powered by Convex
- 🎨 Modern UI with Tailwind CSS & shadcn/ui
- 🌙 Dark mode & responsive design

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui
- Lucide Icons

**Backend**
- Convex (database + queries + mutations)

**Authentication**
- Clerk

**Other Tools**
- React Hook Form + Zod (forms & validation)
- Unsplash integration (event images)
- QR Code generation & scanning
- Gemini/OpenAI (AI event creation)

---

## ⚙️ Getting Started

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Start Convex backend
```bash
npx convex dev
```

### 3️⃣ Run development server
```bash
npm run dev
```

App runs at:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
spott/
│
├── app/            # Pages, routing, layouts
├── components/     # Reusable UI components
├── convex/         # Backend functions & database schema
├── hooks/          # Custom React hooks
├── lib/            # Utilities & helper data
├── public/         # Static assets
│
└── package.json
```

---

## 🧠 Core Flow

Public users:
→ Explore events  
→ View event details  

After login:
→ Complete onboarding  
→ Create events  
→ Register/book tickets  
→ Manage events & attendees  
→ View personal tickets  

---

## 🚧 Future Scope

- 🔔 Notifications system  
- ❤️ Saved events  
- 📊 Advanced organizer dashboard  
- 💳 Paid events & ticketing  
- 📍 Location-based smart recommendations  

---

## 👨‍💻 Author

**Rohan**  
GitHub: https://github.com/rohan24may
```
