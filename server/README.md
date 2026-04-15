# Sky-trip Admin Backend ✈️

This is the backend API for the Sky-trip Admin Dashboard, built with Node.js, Express, and MongoDB.

## 🚀 Technologies Used

- **Node.js & Express**: Core backend runtime and framework.
- **MongoDB & Mongoose**: NoSQL database and Object Modeling.
- **JWT (JSON Web Token)**: Secure authentication and session management.
- **Bcrypt.js**: Password hashing for security.
- **Dotenv**: Environment variable management.
- **CORS**: Cross-Origin Resource Sharing for frontend communication.
- **Morgan**: HTTP request logger for development.

## 📁 Project Structure

```text
server/
├── config/         # Database connection configuration
├── controllers/    # Business logic for routes
├── middleware/     # Auth and error handling middleware
├── models/         # Mongoose schemas (User, Package, etc.)
├── routes/         # Express API route definitions
├── utils/          # Utility scripts (like seeding)
├── .env            # Environment variables (Private)
├── server.js       # Main entry point
└── package.json    # Project dependencies and scripts
```

## 🛠️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the `server` root and add your details (use `.env.example` as a template):
   ```env
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=30d
   ```

3. **Seed Initial Admin**:
   Since there is no public signup page, create your first admin using the seed script:
   ```bash
   node utils/seedAdmin.js
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🔐 Authentication API

- `POST /api/auth/register`: Register a new admin (Used for setup).
- `POST /api/auth/login`: Login as admin and receive a JWT token.

## 📈 Next Steps

- [ ] Connect Frontend Login Page to Backend.
- [ ] Implement Travel Package CRUD (Create, Read, Update, Delete).
- [ ] Add Dashboard Stats API.
