# Smart Gate Pass Management Portal - Setup Guide

## Quick Start Guide

### Step 1: MongoDB Setup

Choose one of the following:

**Option A: Local MongoDB**

```bash
# For Windows (if installed)
# Start MongoDB service

# For macOS
brew services start mongodb-community

# For Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Use connection string in MONGO_URI

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with following content:
MONGO_URI=mongodb://localhost:27017/smart-gate-pass
JWT_SECRET=your_secret_key_12345
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=5000
NODE_ENV=development

# Start backend server
npm start
# or for development
npm run dev

# Server will start on http://localhost:5000
```

### Step 3: Frontend Setup

Open a new terminal/command prompt:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React development server
npm start

# Frontend will start on http://localhost:3000
```

### Step 4: Create Admin User

You need to create an admin user in MongoDB:

```bash
# Using MongoDB shell or MongoDB Compass:

# Connect to database: smart-gate-pass

# Insert admin user in 'users' collection:
db.users.insertOne({
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "$2a$10$abc123...", // Use bcrypt hashed password
  "role": "admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
})
```

**To generate bcrypt hash:**

1. Use online tool: https://bcryptify.herokuapp.com/
2. Hash: "admin123"
3. Copy the hash and use it above

## Accessing the Application

1. **Home Page**: http://localhost:3000/
2. **Student Signup**: http://localhost:3000/student-signup
3. **Student Login**: http://localhost:3000/student-login
4. **Admin Login**: http://localhost:3000/admin-login

## Default Admin Credentials

After creating admin user:

- **Email**: admin@example.com
- **Password**: admin123

## Testing the Application

### Test as Student

1. Go to http://localhost:3000/
2. Click "Sign Up" under Student section
3. Fill in signup form with:
   - First Name: Raj
   - Last Name: Kumar
   - Email: raj@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Sign Up"
5. Dashboard will open with statistics cards
6. Click "Apply for Gate Pass"
7. Fill in the form and submit
8. Check "My Passes" to see your application

### Test as Admin

1. Go to http://localhost:3000/admin-login
2. Login with:
   - Email: admin@example.com
   - Password: admin123
3. Admin Dashboard will show statistics
4. Click "View All Requests"
5. You'll see the student's application
6. Click "Approve" to approve the pass
7. QR code will be generated and email sent
8. Or click "Reject" to reject with a reason

## Email Configuration

To enable email notifications:

1. **Gmail Setup**:
   - Enable 2-factor authentication: https://myaccount.google.com/security
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Copy the 16-character password

2. **Update .env file**:

```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (16-character app password)
```

3. **Test Email**: Approve a gate pass request as admin

## Troubleshooting

### Backend not starting

**Error**: `Cannot find module 'express'`

```bash
cd backend
npm install
```

**Error**: `MongoDB connection failed`

- Check if MongoDB is running
- Verify MONGO_URI in .env
- For local: mongodb://localhost:27017/smart-gate-pass
- For Atlas: mongodb+srv://username:password@cluster.mongodb.net/smart-gate-pass

### Frontend errors

**Error**: `Port 3000 already in use`

```bash
# Kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

**Error**: `Cannot GET /api/gate-pass`

- Make sure backend is running on port 5000
- Check API_URL in services/api.js
- Ensure CORS is enabled in backend

### Database issues

**Error**: `Connection timeout`

- MongoDB not running
- Wrong connection string
- Firewall blocking connection

## Common Endpoints to Test (Postman/Insomnia)

### Authentication

**Student Signup**

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

**Student Login**

```
POST http://localhost:5000/api/auth/student-login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Admin Login**

```
POST http://localhost:5000/api/auth/admin-login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Gate Pass Operations

**Create Gate Pass** (requires token)

```
POST http://localhost:5000/api/gate-pass
Authorization: Bearer <token>
{
  "fullName": "John Doe",
  "department": "IT",
  "rollNumber": "19IT001",
  "purpose": "Home",
  "outDate": "2024-01-15",
  "outTime": "10:00",
  "returnDate": "2024-01-16",
  "returnTime": "18:00"
}
```

## Performance Tips

1. **Database Indexing**: MongoDB automatically indexes common fields
2. **API Caching**: Can be added with Redis
3. **Frontend Optimization**: Lazy load components
4. **Image Compression**: QR codes are already optimized

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use strong passwords
- [ ] Enable HTTPS in production
- [ ] Set CORS origins properly
- [ ] Hash passwords (bcryptjs)
- [ ] Validate all inputs
- [ ] Rate limit API endpoints
- [ ] Use environment variables for secrets

## Next Steps

1. Deploy backend to Heroku/Railway
2. Deploy frontend to Vercel/Netlify
3. Set up production MongoDB
4. Configure email service
5. Add more features (SMS, PDF export, etc.)

## Additional Resources

- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/
- Express.js: https://expressjs.com/
- React: https://react.dev/
- JWT: https://jwt.io/

## Support & Debugging

1. Check browser console for errors (F12)
2. Check terminal/command prompt logs
3. Use MongoDB Compass to view database
4. Use Postman to test API endpoints
5. Read error messages carefully

---

**You're all set! Happy coding! 🚀**
