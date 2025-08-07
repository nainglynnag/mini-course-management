import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../models/studentModel.js";
import db from "../config/db.js";

export const listStudents = async (req, res) => {
  const students = await getAllStudents();
  res.render("students/index", {
    layout: "layouts/layout",
    title: "Students",
    students,
  });
};

export const showCreateForm = async (req, res) => {
  const [courses] = await db.promise().query("SELECT * FROM courses");
  res.render("students/create", {
    layout: "layouts/layout",
    title: "Add Student",
    courses,
  });
};

export const createStudentHandler = async (req, res) => {
  await createStudent(req.body);
  res.redirect("/students");
};

export const showUpdateForm = async (req, res) => {
  const student = await getStudentById(req.params.id);
  const [courses] = await db.promise().query("SELECT * FROM courses");
  res.render("students/update", {
    layout: "layouts/layout",
    title: "Edit Student",
    student,
    courses,
  });
};

export const updateStudentHandler = async (req, res) => {
  await updateStudent(req.params.id, req.body);
  res.redirect("/students");
};

export const deleteStudentHandler = async (req, res) => {
  await deleteStudent(req.params.id);
  res.redirect("/students");
};
