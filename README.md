## Mini Course Management

A mini CRUD application built with Express.js, EJS, and MySQL. It manages Courses, Instructors, Students, and basic enrollments, including assigning a Category and an Instructor to each Course.

### Features

- **Instructor CRUD**: Create, Read, Update, Delete instructors
- **Course CRUD**: Create, Read, Update, Delete courses
- **Assign relationships**: Each course can have a category and an instructor
- **Student module**: Basic students and enrollments tables included
- **EJS views**: Dynamic server-side rendering with a shared layout

### Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Server**: Express
- **Views**: EJS + express-ejs-layouts
- **Database**: MySQL (mysql2)
- **Env**: dotenv

### Project Structure

```text
mini-course-management/
├── config/
│   └── db.js                  # MySQL connection (uses dotenv)
├── controllers/
│   ├── courseController.js
│   ├── dashboardController.js
│   ├── instructorController.js
│   └── studentController.js
├── models/
│   ├── courseModel.js
│   ├── instructorModel.js
│   └── studentModel.js
├── routes/
│   ├── courseRoutes.js
│   ├── dashboardRoutes.js
│   ├── instructorRoutes.js
│   └── studentRoutes.js
├── views/
│   ├── layouts/
│   │   └── layout.ejs         # Main shared layout
│   ├── dashboard/
│   │   └── index.ejs
│   ├── courses/
│   │   ├── index.ejs
│   │   ├── create.ejs
│   │   └── update.ejs
│   ├── instructors/
│   │   ├── index.ejs
│   │   ├── create.ejs
│   │   └── update.ejs
│   └── students/
│       ├── index.ejs
│       ├── create.ejs
│       └── update.ejs
├── server.js                   # App entry point
├── package.json                # Dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- MySQL 8+ (or compatible)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/nainglynnag/mini-course-management.git
   cd mini-course-management
   npm install
   ```

2. Create a `.env` file in the project root and configure database access.

3. Set up the database and tables:

   ```sql
   -- Create Database
   CREATE DATABASE <your DB_NAME>;
   USE <your DB_NAME>;

   -- Tables
   CREATE TABLE categories (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL UNIQUE
   );

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
     category_id INT,
     instructor_id INT,
     FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
     FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
   );

   CREATE TABLE students (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(100) UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE enrollments (
     id INT AUTO_INCREMENT PRIMARY KEY,
     student_id INT,
     course_id INT,
     enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
     FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
   );
   ```

4. Seed some sample data for quicker testing:

   ```sql
   INSERT INTO categories (name) VALUES ('Web Development'), ('Data Science');

   INSERT INTO instructors (name, email) VALUES ('Alice', 'alice@example.com'), ('Bob', 'bob@example.com');

   INSERT INTO courses (title, description, category_id, instructor_id)
   VALUES ('Intro to Web Development', 'Basics of HTML, CSS, and JavaScript', 1, 1);

   INSERT INTO students (name, email)
   VALUES ('John Doe', 'john.doe@example.com');
   ```

### Run the App

```bash
npm run start
```

The server runs at `http://localhost:3000`.

## Available Scripts

- `npm run start`: Starts the server in watch mode with nodemon

## Routes Overview

### Dashboard

- `GET /` → Dashboard

### Courses

- `GET /courses` → List all courses (with category and instructor names)
- `GET /courses/create` → Show create form
- `POST /courses/create` → Create a new course
- `GET /courses/update/:id` → Show update form
- `POST /courses/update/:id` → Update a course
- `GET /courses/delete/:id` → Delete a course

### Instructors

- `GET /instructors` → List all instructors
- `GET /instructors/create` → Show create form
- `POST /instructors/create` → Add new instructor
- `GET /instructors/update/:id` → Show update form
- `POST /instructors/update/:id` → Update instructor
- `GET /instructors/delete/:id` → Delete instructor

### Students

- `GET /students` → List students
- `GET /students/create` → Show create form
- `POST /students/create` → Add new student
- `GET /students/update/:id` → Show update form
- `POST /students/update/:id` → Update student
- `GET /students/delete/:id` → Delete student

## Configuration Details

- Database connection is configured in `config/db.js` and uses environment variables via `dotenv`.
- Views are rendered with EJS and a shared layout (`views/layouts/layout.ejs`).

## Troubleshooting

- Ensure the `.env` values match your MySQL setup and that the DB/tables are created.
- If port 3000 is in use, change the `PORT` in `server.js`.
- If nodemon isn’t restarting, ensure it’s installed (it’s listed in dependencies).

## License

This project is licensed under the terms of the MIT license.
