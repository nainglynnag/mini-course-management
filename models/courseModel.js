import db from "../config/db.js";

export const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT courses.*, instructors.name AS instructor_name
      FROM courses
      LEFT JOIN instructors ON courses.instructor_id = instructors.id
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM courses WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

export const createCourse = (title, description, instructorId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)",
      [title, description, instructorId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const updateCourse = (id, title, description, instructorId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE courses SET title=?, description=?, instructor_id=? WHERE id=?",
      [title, description, instructorId, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM courses WHERE id=?", [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
