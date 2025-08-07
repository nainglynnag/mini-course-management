import db from "../config/db.js";

export const getAllStudents = async () => {
  const [rows] = await db.promise().query(`
    SELECT s.*, c.title AS course_title
    FROM students s
    LEFT JOIN courses c ON s.course_id = c.id
  `);
  return rows;
};

export const getStudentById = async (id) => {
  const [rows] = await db.promise().query("SELECT * FROM students WHERE id = ?", [id]);
  return rows[0];
};

export const createStudent = async (data) => {
  const { name, email, course_id } = data;
  await db.promise().query(
    "INSERT INTO students (name, email, course_id) VALUES (?, ?, ?)",
    [name, email, course_id || null]
  );
};

export const updateStudent = async (id, data) => {
  const { name, email, course_id } = data;
  await db.promise().query(
    "UPDATE students SET name=?, email=?, course_id=? WHERE id=?",
    [name, email, course_id || null, id]
  );
};

export const deleteStudent = async (id) => {
  await db.promise().query("DELETE FROM students WHERE id = ?", [id]);
};
