import db from "../config/db.js";

// Get all students with their enrolled courses (multiple courses per student)
export const getAllStudents = async () => {
  const [rows] = await db.promise().query(`
    SELECT s.*
    FROM students s
    GROUP BY s.id
    ORDER BY s.created_at ASC
  `);
  return rows;
};

// Get a student and their enrolled course IDs
export const getStudentById = async (id) => {
  const [students] = await db
    .promise()
    .query("SELECT * FROM students WHERE id = ?", [id]);
  const student = students[0];
  if (!student) return null;
  const [enrollments] = await db
    .promise()
    .query("SELECT course_id FROM enrollments WHERE student_id = ?", [id]);
  student.course_ids = enrollments.map((e) => e.course_id);
  return student;
};

// Create student and enroll in courses
export const createStudent = async (data) => {
  const { name, email, course_ids } = data;
  const [result] = await db
    .promise()
    .query("INSERT INTO students (name, email) VALUES (?, ?)", [name, email]);
  const studentId = result.insertId;
  if (Array.isArray(course_ids) && course_ids.length > 0) {
    const values = course_ids.map((cid) => [studentId, cid]);
    await db
      .promise()
      .query("INSERT INTO enrollments (student_id, course_id) VALUES ?", [
        values,
      ]);
  }
};

// Update student and their enrollments
export const updateStudent = async (id, data) => {
  const { name, email, course_ids } = data;
  await db
    .promise()
    .query("UPDATE students SET name=?, email=? WHERE id=?", [name, email, id]);
  // Remove old enrollments
  await db
    .promise()
    .query("DELETE FROM enrollments WHERE student_id = ?", [id]);
  // Add new enrollments
  if (Array.isArray(course_ids) && course_ids.length > 0) {
    const values = course_ids.map((cid) => [id, cid]);
    await db
      .promise()
      .query("INSERT INTO enrollments (student_id, course_id) VALUES ?", [
        values,
      ]);
  }
};

export const deleteStudent = async (id) => {
  // enrollments will be deleted automatically via ON DELETE CASCADE
  await db.promise().query("DELETE FROM students WHERE id = ?", [id]);
};
