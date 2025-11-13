# Admin Panel

A full-stack admin panel for managing user sessions with secure authentication and OTP verification.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT, OTP
- **Frontend**: React, Vite
- **Database**: MongoDB

## Features

- Admin login with JWT authentication
- OTP verification for sensitive operations
- User session tracking (device, IP, location)
- View and manage active user sessions
- Secure logout functionality

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
# Create .env file with MONGO_URI and JWT_SECRET
npm run seed  # Seed admin users
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Login as admin (default: kanha@example.com / 123456)
2. Verify OTP for admin actions
3. Enter user email to view their active sessions
4. Manage sessions as needed

## API Endpoints

- `POST /api/auth/login` - Admin login
- `POST /api/admin/send-otp` - Send OTP
- `POST /api/admin/verify-otp` - Verify OTP
- `GET /api/admin/user-sessions/:email` - Get user sessions
- `POST /api/admin/logout-session` - Logout user sessions

## Environment Variables

Create `.env` in backend directory:
```
MONGO_URI=mongodb://localhost:27017/adminpanel
JWT_SECRET=your-secret-key
PORT=5000
```


