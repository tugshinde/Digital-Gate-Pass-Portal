# 🚀 Quick Start - Run in 5 Minutes

## Prerequisites

- Node.js installed (https://nodejs.org)
- MongoDB running (local or use MongoDB Atlas)
- Git (optional)

## Step 1: Backend Setup (2 minutes)

```bash
# Open terminal/command prompt
cd Tushar_dada_project/backend

# Install dependencies
npm install

# Create .env file
# Windows: type .env
# Mac/Linux: touch .env

# Add this to .env:
MONGO_URI=mongodb://localhost:27017/smart-gate-pass
JWT_SECRET=your_secret_key_123
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=5000
NODE_ENV=development

# Start backend
npm start

# ✅ You should see: "Server running on port 5000"
```

## Step 2: Frontend Setup (2 minutes)

Open **NEW** terminal/command prompt:

```bash
cd Tushar_dada_project/frontend

# Install dependencies
npm install

# Start frontend
npm start

# ✅ Automatically opens http://localhost:3000
```

## Step 3: Create Admin User (1 minute)

Use MongoDB Compass or shell:

```javascript
// Collection: users
// Database: smart-gate-pass

db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/KFm", // bcrypt hash of "admin123"
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

**OR use online bcrypt generator:**

1. Go to: https://bcryptify.herokuapp.com/
2. Hash: `admin123`
3. Copy hash and replace in above

## Step 4: Access Application

```
🏠 Home:         http://localhost:3000
👨‍🎓 Student:      http://localhost:3000/student-signup
👨‍💼 Admin Login:   http://localhost:3000/admin-login

Admin Email:     admin@example.com
Admin Password:  admin123
```

## Troubleshooting

### MongoDB Connection Error

```
Check if MongoDB is running:
- Windows: Check Services
- Mac: brew services list
- Linux: systemctl status mongod

OR use MongoDB Atlas cloud database
```

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

## Test the Project

1. **As Student:**
   - Go to http://localhost:3000/student-signup
   - Sign up with: raj@example.com / password123
   - Click "Apply Pass"
   - Fill form and submit

2. **As Admin:**
   - Go to http://localhost:3000/admin-login
   - Login with: admin@example.com / admin123
   - Click "View All Requests"
   - Click "Approve" on the request
   - QR code generated!

## Full Documentation

- **Setup Guide**: See SETUP_GUIDE.md
- **Project Details**: See PROJECT_SUMMARY.md
- **Viva Prep**: See VIVA_PREP.md
- **Checklist**: See COMPLETION_CHECKLIST.md

## Quick Commands

```bash
# Backend
npm start          # Start server
npm run dev        # Start with auto-reload (needs nodemon)

# Frontend
npm start          # Start React dev server
npm build          # Build for production
npm test           # Run tests
```

## API Testing

Use Postman/Insomnia to test:

**Signup:**

```
POST http://localhost:5000/api/auth/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Login:**

```
POST http://localhost:5000/api/auth/student-login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Features to Try

✅ Signup and login as student
✅ Apply for gate pass
✅ View your passes
✅ Edit pending pass
✅ Delete pending pass
✅ Login as admin
✅ Approve a pass (QR generated)
✅ Reject a pass
✅ Search functionality
✅ Filter by status

## Still Stuck?

1. Check terminal for error messages
2. Check browser console (F12)
3. Check MongoDB is running
4. Check port 3000 and 5000 are free
5. Check .env file has correct values
6. Read SETUP_GUIDE.md for detailed help

---

## 📞 Contact Info

- Frontend Issue? Check browser console (F12)
- Backend Issue? Check terminal output
- Database Issue? Check MongoDB is running

---

**You're all set! Enjoy the project! 🎉**

**Happy Coding! 🚀**
