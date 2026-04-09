# Sky-trip Fullstack Project

This repository contains the complete stack for the Sky-trip travel project.

## Project Structure

- **/client**: The main travel website (Vite + React + Tailwind).
- **/admin**: The Admin Dashboard for managing packages and bookings (Vite + React + Tailwind).
- **/server**: The Backend API (Node.js + Express + MongoDB).

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### Setup

1. **Backend**:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

2. **Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Admin**:
   ```bash
   cd admin
   npm install
   npm run dev
   ```

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express, Mongoose (MongoDB), JWT Authentication.
