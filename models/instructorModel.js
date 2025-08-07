import db from "../config/db.js";

export const getAllInstructors = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM instructors", (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const getInstructorById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM instructors WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};

export const createInstructor = (name, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO instructors (name, email) VALUES (?, ?)",
      [name, email],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const updateInstructor = (id, name, email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE instructors SET name=?, email=? WHERE id=?",
      [name, email, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

export const deleteInstructor = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM instructors WHERE id=?", [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
