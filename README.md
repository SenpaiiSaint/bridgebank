UnBanked
UnBanked is a lightweight digital banking platform built to demonstrate how fintech solutions can serve unbanked and underbanked populations. It showcases basic fintech concepts like account creation, transactions, micro-lending, and an SMS/USSD fallback simulation

Features
User Onboarding & Account Creation
Create a user with a one-to-one linked account and initial balance.

Transaction System
Support for deposits (credits), withdrawals (debits), and basic transaction history.

Micro-Lending
Users can request and track micro-loans with interest and term lengths.

NGO/Admin Dashboard
Displays all users, their accounts, outstanding loans, and transaction logs.

SMS/USSD Simulation
Low-tech fallback for USSD flows, mimicking how unbanked users might access balances and make transfers on basic phones.

Offline & Emerging Markets Focus (conceptual)
Geared toward real-world constraints such as sporadic network, offline usage, and localized agent-based deposits/withdrawals (conceptually).

Tech Stack
Next.js(App Router)

React

Tailwind CSS

Prisma ORM 

[TypeScript or JavaScript] (the example provided is JS; you can adapt to TS)

Usage
Home Page (/)
Overview of the project and quick links to the NGO Dashboard and USSD Simulation.

NGO Dashboard (/dashboard)

Displays all created Accounts, their Balances, Transactions, and any Loans.

Great for admin or NGO staff to see app usage at a glance.

USSD Simulation (/ussd)

Type in USSD-like codes to check balance, transfer funds, or request a loan.

Showcases how a low-tech user might interact with the platform on a basic phone.

API Endpoints (/api/...)

Accounts: /api/accounts

Transactions: /api/transactions

Loans: /api/loans

USSD: /api/ussd

These implement basic create/read logic using Prisma.

Expanding the Project
Want to make this project shine even more in your portfolio? Here are a few ideas:

Multiple Currency Support: Handle multiple local currencies and conversions.

KYC & Identity Verification: Add ID uploads or basic face matching to simulate compliance flows.

Real-Time Updates: Use WebSockets or a service like Pusher to show live balance changes.

Offline Mode: Implement a PWA approach to allow for transaction queuing and syncing once online.

Agent Network: Let users find local agents to deposit or withdraw cash.

Analytics Dashboard: Add charts to visualize user growth, total transactions, and defaulted loans over time.

[Sharif Parish]

