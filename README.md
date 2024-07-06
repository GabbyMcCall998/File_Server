# File Server Application

## Overview

This project is a file server application built using Node.js, Express, React and MongoDB. The application provides functionalities for user registration, authentication, file upload, file sharing, and administrative control. Users can share files files, download files, and manage their files through an intuitive web interface. Administrators have additional capabilities to manage all users' files.

## Features

- User Registration and Authentication
- File Upload and Management
- Folder Creation and Management
- File Sharing via Email
- Password Recovery via Email
- Administrative Dashboard for File Management

## Prerequisites
- React
- Node.js
- MongoDB
- Git (optional)


## Getting Started

### Clone the Repository

bash

git clone <repository-url>
cd <repository-directory>

Install Dependencies

npm install

Environment Variables
Create a .env file in the root directory and add the following environment variables:

Server_Url= http://localhost:5000/
BASE_URL= http://localhost:3000/
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-session-secret>      
HOST=smtp.gmail.com
SERVICE=gmail
EMAIL_PORT=587
SECURE=false
USER=gabrielandoh998@gmail.com
PASS=ybrx hlxc iuhm ljeo



npm run start


The application will be running on http://localhost:5000.


File Structure
├── frontend
│   ├── public
│   ├── src
│   │   ├── admin
│   │   │   ├── Addfile
│   │   │   │   └── Addfile.css
│   │   │   │   └── Addfile.jsx
│   │   │   ├── AdminSignup
│   │   │   │   └── AdminSignup.css
│   │   │   │   └── AdminSignup.jsx
│   │   │   ├── Assets
│   │   │   ├── Listfile
│   │   │   │   └── Listfile.css
│   │   │   │   └── Listfile.jsx
│   │   │   ├── Sidebar
│   │   │   │   └── Sidebar.css
│   │   │   │   └── Sidebar.jsx
│   │   │   └── adminFileControllers.js
├── backend
│   ├── controllers
│   │   └── adminFileControllers.js
│   │   └── authController.js
│   │   └── fileController.js
│   ├── middlewares
│   │   └── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models
│   │   └── file.js
│   │   └── token.js
│   │   └── User.js
│   ├── routes
│   │   └── adminRoutes.js
│   │   └── authRoutes.js
│   │   └── fileRoutes.js
│   ├── upload
│   │   └── files
│   ├── utils
│   │   └── fileUtils.js
│   │   └── sendEmail.js
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
└── README.md



Usage

User Registration
1.Navigate to http://localhost:3000/signup.
2.Fill out the registration form and submit.
3.Verify your email using the link sent to your email address.


User Login

1.Navigate to http://localhost:3000/login.
2.Enter your credentials and log in.
3.After logging in, navigate to the "Document" section, to view the feed page
4.Click on "Download" to download a file.
5.Click on "Send Mail" to send file to any email.


Password Recovery

1.Navigate to http://localhost:3000/forgot-password.
2.Enter your registered email address to receive a password recovery link.


Admin Dashboard

1.Navigate to http://localhost:3000/admin/signup to create admin account
2.Log in with an admin account to access the admin dashboard 
3.Admins can upload files, view uploaded files,remove files and manage user files.


Contributing

1.Fork the repository.
2.Create a new branch (git checkout -b feature-branch).
3.Make your changes.
4.Commit your changes (git commit -m 'Add some feature').
5.Push to the branch (git push origin feature-branch).
6.Open a pull request.


License

This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgements
-Express
-MongoDB
-React
-Nodemailer
