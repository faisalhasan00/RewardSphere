# RewardSphere 🚀

RewardSphere is a high-performance cashback affiliate platform backend. It handles user authentication, store/deal management, click tracking, and a redundant financial system for processing affiliate commissions.

## ✨ Features

- **OTP Authentication**: Secure login system with JWT and OTP service.
- **Dynamic Store & Deal Engine**: Efficient management of affiliate deals with Redis-backed trending and caching.
- **Click Tracking & Postbacks**: Advanced redirect engine with unique click IDs and safe postback validation for networks like Cuelinks.
- **Precise Financial Logic**: 
    - All monetary values stored in **Paise** (Integer math) for 100% precision.
    - Multi-stage conversion lifecycle: `PENDING` -> `CONFIRMED` -> `CREDITED`.
    - Automated reversal logic for returned/rejected orders.
- **Clean Architecture**: Decoupled Service-Repository pattern with manual Dependency Injection.

## 🛠️ Tech Stack

- **Runtime**: Node.js (TypeScript)
- **Database**: PostgreSQL (Prisma ORM)
- **Caching/Queue**: Redis
- **Security**: Helmet, Rate Limiting, JWT, Secret Token Validation

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/faisalhasan00/RewardSphere.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env` and configure your database and API keys.

4. **Initialize DB**
   ```bash
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

---
*Developed with focus on financial accuracy and scalability.*
