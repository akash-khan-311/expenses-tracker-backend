# Expense Tracker Backend

A simple Expense Tracker backend built with **Node.js**, **Express**, **TypeScript**,**MongoDB**, and **Mongoose**.  
It provides authentication, expense management, and protected routes.

---

## Features

- User authentication:
  - Register
  - Login
  - JWT-based access & refresh tokens
- User roles: `user`, `admin`, `superAdmin`
- Expense management:
  - Add new expense
  - Prevent duplicate titles per user
  - Filter by category
  - Sort by date
- Middleware for protected routes
- Validation using Zod
- Password hashing with bcrypt

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB & Mongoose
- Zod for validation
- bcrypt for password hashing
- JWT for authentication
- http-status for HTTP codes

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd backend
npm install
```

## Create a .env file in the root:

```bash
NODE_ENV=development
DATABASE_URL=your_database_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRES=1d
REFRESH_TOKEN_EXPIRES=7d

```

## Run the server:

```bash
npm run dev
```
