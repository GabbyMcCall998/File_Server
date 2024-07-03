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


Code Copilot
Below is a well-written README file for my project.

markdown
Copy code
# File Server Application

## Overview

This project is a file server application built using React.js Node.js, Express, and MongoDB. The application provides functionalities for user registration, authentication, file upload, file sharing, and administrative control. Users can share via email, download, and manage their files through an intuitive web interface. Administrators have additional capabilities to manage all users' files.

## Features

- User Registration and Authentication
- File Upload and Management
- Folder Creation and Management
- File Sharing with Other Users
- Password Recovery via Email
- Administrative Dashboard for File Management

## Prerequisites

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


Run the Application

npm run start
The application will be running on http://localhost:5000.

File Structure

├── public
│   ├── css
│   │   └── style.css
│   ├── js
│   └── font-awesome-4.7.0
│       ├── css
│       ├── fonts
│       └── less
├── views
│   ├── includes
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── AdminDashboard.ejs
│   ├── index.ejs
│   ├── Login.ejs
│   ├── Register.ejs
│   ├── SharedWithMe.ejs
│   ├── MyUploads.ejs
│   ├── ForgotPassword.ejs
│   ├── ResetPassword.ejs
│   ├── Search.ejs
│   └── Error.ejs
├── .env
├── package.json
├── app.js
└── README.md
Usage
User Registration
Navigate to http://localhost:3000/signup.
Fill out the registration form and submit.
Verify your email using the link sent to your email address.
User Login
Navigate to http://localhost:3000/login.
Enter your credentials and log in.
File Upload
After logging in, navigate to the "Document" section, to view the feed page
Click on "Download" to download a file.
Click on "Send Mail" to send file to any email.
You can also create folders to organize your files.
File Sharing
In the "My Uploads" section, click on "Share" for any file or folder.
Enter the email address of the user you want to share the file with.
Password Recovery
Navigate to http://localhost:3000/ForgotPassword.
Enter your registered email address to receive a password recovery link.
Admin Dashboard
Log in with an admin account.
Navigate to http://localhost:3000/dmin to access the admin dashboard.
Admins can upload files, view uploaded files,remove files and manage user files.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgements
Express
MongoDB
Bootstrap
Font Awesome
Nodemailer
