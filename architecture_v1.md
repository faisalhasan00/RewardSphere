# RewardSphere - System Architecture & Documentation (v1.0.1)

Refactored for a clean dual-folder architecture.

## 1. Project Structure

```text
/Grabon Copy
├── /Backend               # Express API & Domain Logic
│   ├── /src               # Source Code
│   ├── /prisma            # Database Schema
│   ├── .env               # Local Environment
│   └── package.json       # Node Manifest
└── /Frontend              # Next.js 14 Application
    ├── /src               # Source (App, Components, Store)
    ├── .env.local         # Local API connection
    └── package.json       # React Manifest
```

---

## 2. Status of Modules (Backend)

- **Auth**: Fully implemented with JWT + OTP + RBAC (User/Admin).
- **Stores & Deals**: Slug-based navigation + Redis caching.
- **Click Tracking**: Unique `clickId` generation + session mapping.
- **Cashback**: Idempotent postback engine + 60-day cool-down logic.
- **Wallet**: Precision BigInt (Paise) currency engine + UPI Withdrawal system.
- **Referral**: Invite codes + Milestone payout (₹25 on first purchase).
- **Admin**: Multi-module steering dashboard + reporting.

---

## 3. Frontend Foundation (Frontend)

- **Tech**: Next.js 14, Zustand, Framer Motion, Axios.
- **Status**: Core components (Button, DealCard, Sidebar) and API integration layer ready.

---

## 4. Key Security & Performance
- **Caching**: Multi-layered Redis for hot stores/categories.
- **Security**: Helmet, HPP, XSS-Clean, Sanitize, Request ID Trace.
- **Validation**: Zod (Backend) & TypeScript (Global).

---

## 5. Next Steps
- Implement Cuelinks Store Sync Engine (Backend).
- Build main dashboard UI (Frontend).
- Integrate live Email/SMS providers.
