# VoltBuddy Backend Troubleshooting Guide

## Error: "❌ Failed to fetch notifications: 404 Not Found"

This error means the backend server is not running or not accessible. Here's how to fix it:

### Step 1: Start the Backend Server

1. **Option A - Using the batch file:**
   - Double-click `start-backend.bat` in the root folder
   - This will automatically navigate to the backend folder and start the server

2. **Option B - Manual startup:**
   - Open Command Prompt or PowerShell
   - Navigate to the backend folder:
     ```cmd
     cd "d:\programming_II\capstone project\voltbuddy-Smart-Home-Electricity-Bill-Tracker-with-AI-Insights\voltbuddy-backend"
     ```
   - Start the server:
     ```cmd
     node server.js
     ```
     OR
     ```cmd
     npm start
     ```

### Step 2: Verify Server is Running

You should see output like:
```
✅ Database connected successfully!
🚀 Server is running on port 5001
⏰ Automated bill reminder system started
```

### Step 3: Start the Frontend

1. **Option A - Using the batch file:**
   - Double-click `start-frontend.bat` in the root folder

2. **Option B - Manual startup:**
   - Open a new Command Prompt/PowerShell window
   - Navigate to the frontend folder:
     ```cmd
     cd "d:\programming_II\capstone project\voltbuddy-Smart-Home-Electricity-Bill-Tracker-with-AI-Insights\voltbuddy-frontend"
     ```
   - Start the frontend:
     ```cmd
     npm run dev
     ```

### Step 4: Check if Everything is Working

1. Open browser to `http://localhost:3000`
2. The notification system should now work without 404 errors
3. Check the browser console - you should see:
   ```
   ✅ Notifications fetched: X notifications
   📡 Navbar - Offline mode: false
   ```

### Offline Mode Features

If the backend is not available, the app will automatically switch to "Offline Mode":
- ✅ Local notifications still work (appliances, bill calculations)
- ✅ Notifications are saved in browser localStorage
- ✅ Orange "Offline" indicator appears in notification panel
- ✅ App continues to function normally

### Common Issues & Solutions

1. **Port 5001 already in use:**
   - Check if another instance is running
   - Kill the process or change the port in server.js

2. **Database connection errors:**
   - Check your MongoDB connection string in .env file
   - Make sure MongoDB is running

3. **Module not found errors:**
   - Run `npm install` in the backend folder

4. **CORS errors:**
   - Backend is configured for localhost:3000
   - Make sure frontend runs on port 3000

### Environment Variables Required

Create a `.env` file in the backend folder with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Testing Notifications

1. **Test Appliance Notifications:**
   - Go to Appliance Management
   - Add/edit/delete an appliance
   - Check notification bell for updates

2. **Test Bill Notifications:**
   - Go to Dashboard → Current Bill
   - Calculate a bill
   - Check for notification with due date

3. **Test Button:**
   - Use the purple "🧪 Test Notification" button in Current Bill
   - Should create an instant notification

### Need Help?

If issues persist:
1. Check browser console for detailed error messages
2. Check backend terminal for server logs
3. Verify all dependencies are installed
4. Check network connectivity between frontend and backend

The notification system is now resilient and will work in offline mode if the backend is unavailable!
