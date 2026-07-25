# Reelbite Production

Reelbite Production is a full-stack food discovery and partner engagement platform. It lets food partners upload short video reels, while users can browse food content, search for restaurants, like reels, and comment on them.

## Project Summary

This project combines a modern Next.js frontend with an Express.js backend and MongoDB database. It is designed for a short-video-style food experience where restaurants can showcase their dishes and customers can discover them quickly.

### What the app includes

- User registration and login
- Partner registration and login
- Food partner dashboard
- Reel/video upload for partners
- Reels feed for users
- Like and comment features
- Explore page with search
- Partner profile view
- Authentication with JWT and cookies
- Backend rate limiting and basic security middleware

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- Multer for file handling
- Cookie parser
- Rate limiting
- ImageKit for media upload storage

## Project Structure

```text
backend/
  src/
    controller/
    db/
    middleware/
    models/
    routes/
    services/
  server.js

frontend/
  src/
    app/
      dashboard/
      explore/
      login/
      partner/
      reels/
      register/
      upload/
    components/
    lib/
```

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- npm installed
- A MongoDB database
- An ImageKit account for video/image storage

## Environment Variables

### Backend
Create a .env file inside the backend folder with the following values:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3001
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Frontend
Create a .env.local file inside the frontend folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Step-by-Step Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 3. Start the backend server

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 4. Start the frontend app

```bash
cd frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:3001
```

## Step-by-Step App Workflow

### For Users

1. Open the app in your browser.
2. Register a new user account or log in.
3. Browse the Explore page to see available food reels.
4. Search for a restaurant, food name, or description.
5. Open a reel and interact with it by liking or commenting.
6. Click the partner action button to view the restaurant profile.

### For Food Partners

1. Register as a food partner.
2. Log in to the partner dashboard.
3. Upload a new reel from the upload page.
4. Your reel will be stored and shown in the public feed.
5. View your uploaded reels and profile info from the dashboard.

## Main Features

### Authentication
- Separate login and registration for users and partners
- JWT-based authentication with cookies
- Protected routes for dashboard and reel actions

### Reels and Content
- Partners can upload reels linked to their restaurant profile
- Users can view reels in a full-screen feed
- Like and comment system is included for engagement

### Explore Experience
- Search functionality helps users discover content quickly
- Reels are shown in a vertical-style browsing layout

## API Overview

The backend exposes routes under the /api prefix:

- Auth routes: /api/auth
- Food routes: /api/food
- Partner routes: /api/partner

Examples:
- POST /api/auth/user/register
- POST /api/auth/user/login
- POST /api/auth/partner/register
- POST /api/food
- GET /api/food/reels
- POST /api/food/like
- POST /api/food/comment

## Development Notes

- The frontend expects the backend API at the URL defined in NEXT_PUBLIC_API_URL.
- The backend uses cookies for auth, so both services should be running on matching local origins.
- If you deploy the app, update the environment variables to match your production URLs.

## Deployment Reminder

For production deployment:

- Set NODE_ENV=production
- Use secure production values for JWT_SECRET and database credentials
- Configure CORS properly with your deployed frontend URL
- Make sure ImageKit credentials are valid

## Conclusion

Reelbite Production is a simple but complete food reel platform that combines content sharing, social interaction, and partner promotion in one experience.


