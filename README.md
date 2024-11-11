**# RBAC-logging-users-using-Passport-Node.js**

*## 📜 Description*
A Node.js application implementing **Role-Based Access Control (RBAC)** using **Passport.js** for authentication. This project allows for user registration, login, and access management based on roles such as Admin, Employer, and Candidate.

## 🚀 Features
- User authentication using Passport.js (Local Strategy).
- Role-Based Access Control (RBAC) to manage different user roles.
- Password hashing using bcrypt.
- API endpoints secured with role-based middleware.
- MongoDB for data persistence.
- Logging users' activities and access.

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **Passport.js** (for authentication)
- **MongoDB & Mongoose** (for database)
- **bcryptjs** (for password hashing)
- **dotenv** (for environment variables)
- **Postman** (for API testing)

## 📦 Installation

 **Clone the repository**:
   git clone https://github.com/your-username/RBAC-logging-users-using-Passport-Node.js.git
   cd RBAC-logging-users-using-Passport-Node.js
Install dependencies:

npm install
Set up MongoDB:

Make sure you have MongoDB installed and running on your local machine or use a MongoDB Atlas cloud database.
🗝️ Environment Variables
Create a .env file in the root directory and add the following:

makefile
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret


▶️ Usage
Run the application:
npm start
