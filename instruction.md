# Project Overview

This is a mini CRUD application built with Express.js, EJS, and MySQL. It manages Courses and Instructors with a one-to-many relationship (one instructor can have multiple courses).

✅ Features
Instructor CRUD

Create, Read, Update, Delete instructors.

Course CRUD

Create, Read, Update, Delete courses.

Assign course to an instructor.

EJS Views for rendering dynamic pages.

MySQL database for storing data.

✅ Project Structure
pgsql
Copy
Edit
mini-crud-app/
├── config/
│ └── db.js # MySQL connection
├── controllers/
│ ├── courseController.js
│ └── instructorController.js
├── models/
│ ├── courseModel.js
│ └── instructorModel.js
├── routes/
│ ├── courseRoutes.js
│ └── instructorRoutes.js
├── views/
│ ├── courses/
│ │ ├── index.ejs
│ │ ├── create.ejs
│ │ └── update.ejs
│ └── instructors/
│ ├── index.ejs
│ ├── create.ejs
│ └── update.ejs
├── public/ # (Optional: CSS, JS)
├── server.js
├── package.json
└── INSTRUCTION.md

## Use the following dependencies:

"dependencies": {
"body-parser": "^2.2.0",
"cors": "^2.8.5",
"dotenv": "^17.2.1",
"ejs": "^3.1.10",
"express": "^5.1.0",
"mysql2": "^3.14.3"
}

✅ Database Setup

1. Create Database
   sql
   Copy
   Edit
   CREATE DATABASE mini_crud_db;
   USE mini_crud_db;
2. Create Tables
   sql
   Copy
   Edit
   CREATE TABLE instructors (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

CREATE TABLE courses (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(150) NOT NULL,
description TEXT,
instructor_id INT,
FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);
✅ Installation & Setup

1. Clone the Project
   bash
   Copy
   Edit
   git clone <your-repo-url>
   cd mini-course-instructor-management
2. Install Dependencies
   bash
   Copy
   Edit
   npm install express mysql2 ejs
3. Create config/db.js
   js
   Copy
   Edit
   import mysql from 'mysql2';

const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '', // Your MySQL password
database: 'mini_crud_db'
});

db.connect(err => {
if (err) console.error('Database connection failed:', err);
else console.log('MySQL connected...');
});

export default db;
✅ Run the Application
Start Server
bash
Copy
Edit
node server.js
Access in Browser
bash
Copy
Edit
http://localhost:3000/courses
http://localhost:3000/instructors
✅ Routes Overview
Instructors
GET /instructors → List all instructors

GET /instructors/create → Show create form

POST /instructors/create → Add new instructor

GET /instructors/update/:id → Show update form

POST /instructors/update/:id → Update instructor

GET /instructors/delete/:id → Delete instructor

Courses
GET /courses → List all courses

GET /courses/create → Show create form

POST /courses/create → Add new course

GET /courses/update/:id → Show update form

POST /courses/update/:id → Update course

GET /courses/delete/:id → Delete course

✅ Views (EJS)
Shared Layouts: Use <%- include('partials/header') %> and <%- include('partials/footer') %> for DRY structure.

File Naming:

create.ejs → For adding new data

update.ejs → For editing data

✅ Best Practices
Use ES6 imports instead of require().

Use async/await for database operations (wrap MySQL in promises if needed).

Organize models, controllers, and routes for clean separation of concerns.

Validate form data on both client and server side.
