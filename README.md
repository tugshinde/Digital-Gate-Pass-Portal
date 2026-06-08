# Smart Gate Pass Management Portal

A full-stack web application for managing digital gate passes in educational institutions.

## Features

✅ Student Signup & Login with JWT Authentication
✅ Admin Dashboard with Statistics
✅ Apply for Gate Pass Online
✅ Real-time Status Tracking (Pending, Approved, Rejected)
✅ QR Code Generation for Approved Passes
✅ Email Notifications (Approval & Rejection)
✅ Search & Filter Functionality
✅ Edit & Delete Pending Passes
✅ Responsive UI Design
✅ Simple & Beginner-Friendly Code

## Technology Stack

**Frontend:**

- React 18
- React Router DOM
- Axios
- HTML5 & CSS3

**Backend:**

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Bcryptjs (Password Hashing)
- NodeMailer (Email Service)
- QRCode (QR Code Generation)

## Project Structure

```
smart-gate-pass/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── GatePass.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── gatePassController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── gatePassRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   ├── db.js
│   │   ├── emailService.js
│   │   └── qrService.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Sidebar.js
    │   │   ├── DashboardCard.js
    │   │   ├── StatusBadge.js
    │   │   ├── QRCodeCard.js
    │   │   ├── SearchBar.js
    │   │   ├── FilterDropdown.js
    │   │   ├── Toast.js
    │   │   └── LoadingSpinner.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── StudentSignup.js
    │   │   ├── StudentLogin.js
    │   │   ├── AdminLogin.js
    │   │   ├── StudentDashboard.js
    │   │   ├── ApplyPass.js
    │   │   ├── StudentPasses.js
    │   │   ├── AdminDashboard.js
    │   │   └── AdminRequests.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   └── App.css
    │   ├── App.js
    │   ├── index.js
    │   └── package.json
    └── .gitignore

```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file and configure:

```
MONGO_URI=mongodb://localhost:27017/smart-gate-pass
JWT_SECRET=your_jwt_secret_key_change_this_in_production
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=5000
NODE_ENV=development
```

4. Start the backend server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## User Roles & Credentials

### Student

- **Signup**: Create account with email and password
- **Features**: Apply pass, view status, edit/delete pending requests

### Admin

- **Default Credentials**: (Create in database)
  - Email: admin@example.com
  - Password: admin123
- **Features**: View all requests, approve/reject, manage students

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Student registration
- `POST /api/auth/student-login` - Student login
- `POST /api/auth/admin-login` - Admin login

### Gate Pass (Student)

- `POST /api/gate-pass` - Create gate pass
- `GET /api/gate-pass/my-passes` - Get student's passes
- `PUT /api/gate-pass/:id` - Edit pending pass
- `DELETE /api/gate-pass/:id` - Delete pending pass
- `GET /api/gate-pass/stats/student` - Get student stats

### Gate Pass (Admin)

- `GET /api/gate-pass` - Get all passes
- `GET /api/gate-pass/:id` - Get pass details
- `PUT /api/gate-pass/:id/approve` - Approve pass
- `PUT /api/gate-pass/:id/reject` - Reject pass
- `GET /api/gate-pass/admin/stats` - Get admin stats

## Email Configuration

To enable email notifications:

1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Add to `.env`:

```
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
```

## Features Explained

### Student Features

**Dashboard Cards**

- Total Requests: Total gate passes applied
- Approved Passes: Count of approved passes
- Pending Passes: Count of pending passes
- Rejected Passes: Count of rejected passes

**Apply Gate Pass**

- Fill in personal and travel details
- Submit for admin approval
- Default status: Pending

**View & Manage Passes**

- See all pass requests
- Search by purpose or roll number
- Filter by status (Pending/Approved/Rejected)
- Edit pending requests
- Delete pending requests
- Download QR code for approved passes

### Admin Features

**Dashboard Statistics**

- Total Students
- Total Requests
- Approved/Pending/Rejected counts

**Manage Requests**

- View all student requests
- Search by name or roll number
- Filter by status
- Approve requests (generates QR code, sends email)
- Reject requests (sends email with reason)

**QR Code**

- Automatically generated on approval
- Contains: Student name, Pass ID, Dates, Times, Status
- Displayed in student dashboard

## Database Models

### User Model

```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  department: String,
  rollNumber: String,
  timestamps: true
}
```

### GatePass Model

```javascript
{
  studentId: ObjectId (ref: User),
  fullName: String,
  email: String,
  department: String,
  rollNumber: String,
  purpose: String,
  outDate: Date,
  outTime: String,
  returnDate: Date,
  returnTime: String,
  status: String (Pending/Approved/Rejected),
  qrCode: String,
  rejectionReason: String,
  timestamps: true
}
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes (student-only, admin-only)
- CORS enabled for cross-origin requests

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check MONGO_URI in .env
- Use `mongodb+srv://` for Atlas cloud database

### Email Not Sending

- Verify EMAIL_USER and EMAIL_PASSWORD
- Check Gmail App Password is correct
- Enable "Less secure app access" if not using App Password

### CORS Error

- Ensure backend is running on port 5000
- Check API_URL in frontend (http://localhost:5000)
- Verify CORS is enabled in Express

### Port Already in Use

```bash
# For Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For macOS/Linux
lsof -i :5000
kill -9 <PID>
```

## Development Tips

1. **Add Admin User**: Connect to MongoDB and insert admin:

```javascript
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@example.com",
  password: bcrypt.hashSync("admin123", 10),
  role: "admin",
});
```

2. **View API Responses**: Use Postman or Insomnia for testing APIs

3. **Debug Frontend**: Use React Developer Tools browser extension

4. **View Logs**: Check terminal where servers are running

## Future Enhancements

- Mobile app (React Native)
- SMS notifications
- Attendance tracking
- Multiple approver levels
- Pass history export (PDF/Excel)
- Analytics dashboard
- Two-factor authentication (2FA)
- File uploads (documents)
- Bulk pass generation

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

**Happy Learning! 🎓**

This project is beginner-friendly and designed for CDAC viva presentations. All code is well-commented and easy to understand.
