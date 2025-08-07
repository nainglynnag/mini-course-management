import db from "../config/db.js";

export const getAllCourses = async () => {
  const [rows] = await db.promise().query(`
    SELECT cr.*, i.name AS instructor_name, c.name AS category_name
    FROM courses cr
    LEFT JOIN instructors i ON cr.instructor_id = i.id
    LEFT JOIN categories c ON cr.category_id = c.id
  `);
  return rows;
};
console.log(getAllCourses());

export const getCourseById = async (id) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM courses WHERE id = ?", [id]);
  return rows[0];
};

export const createCourse = async (data) => {
  const { title, description, category_id, instructor_id } = data;
  await db
    .promise()
    .query(
      "INSERT INTO courses (title, description, category_id, instructor_id) VALUES (?, ?, ?, ?)",
      [title, description, category_id || null, instructor_id || null]
    );
};

export const updateCourse = async (id, data) => {
  const { title, description, category_id, instructor_id } = data;
  await db
    .promise()
    .query(
      "UPDATE courses SET title=?, description=?, category_id=?, instructor_id=? WHERE id=?",
      [title, description, category_id || null, instructor_id || null, id]
    );
};

export const deleteCourse = async (id) => {
  await db.promise().query("DELETE FROM courses WHERE id = ?", [id]);
};
