# Booking System — Backend API

A RESTful API for a full-stack booking system built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **express-validator** — Input validation
- **JSend** — Response format

## Project Structure

```
src/
├── config/         # Database connection
├── controllers/    # Route handlers
├── middlewares/    # Auth, validation, admin guard
├── models/         # Mongoose schemas
├── routes/         # API routes
└── validators/     # Input validators
```

## Authentication

JWT-based authentication with role-based access control (Admin / User).

## 📡 API Endpoints

### Auth

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| POST   | `/api/auth/register`     | Register new user         |
| POST   | `/api/auth/login`        | Login                     |
| POST   | `/api/auth/create-admin` | Create admin (admin only) |

### Bookings

| Method | Endpoint             | Description      | Auth  |
| ------ | -------------------- | ---------------- | ----- |
| POST   | `/api/bookings`      | Create booking   | User  |
| GET    | `/api/bookings/mine` | Get my bookings  | User  |
| GET    | `/api/bookings`      | Get all bookings | Admin |
| PATCH  | `/api/bookings/:id`  | Update status    | Admin |
| DELETE | `/api/bookings/:id`  | Delete booking   | Admin |

### Users

| Method | Endpoint             | Description    | Auth  |
| ------ | -------------------- | -------------- | ----- |
| GET    | `/api/users/profile` | Get my profile | User  |
| PUT    | `/api/users/profile` | Update profile | User  |
| GET    | `/api/users`         | Get all users  | Admin |
| DELETE | `/api/users/:id`     | Delete user    | Admin |

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

## Installation

```bash
npm install
npm run dev
```
