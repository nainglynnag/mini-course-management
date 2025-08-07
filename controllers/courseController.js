import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../models/courseModel.js";

import db from "../config/db.js";

export const listCourses = async (req, res) => {
  const courses = await getAllCourses();
  res.render("courses/index", {
    layout: "layouts/layout",
    title: "Courses",
    courses,
  });
};

export const showCreateForm = async (req, res) => {
  const [categories] = await db.promise().query("SELECT * FROM categories");
  const [instructors] = await db.promise().query("SELECT * FROM instructors");
  res.render("courses/create", {
    layout: "layouts/layout",
    title: "Add Course",
    categories,
    instructors,
  });
};

export const createCourseHandler = async (req, res) => {
  await createCourse(req.body);
  res.redirect("/courses");
};

export const showUpdateForm = async (req, res) => {
  const course = await getCourseById(req.params.id);
  const [categories] = await db.promise().query("SELECT * FROM categories");
  const [instructors] = await db.promise().query("SELECT * FROM instructors");
  res.render("courses/update", {
    layout: "layouts/layout",
    title: "Edit Course",
    course,
    categories,
    instructors,
  });
};

export const updateCourseHandler = async (req, res) => {
  await updateCourse(req.params.id, req.body);
  res.redirect("/courses");
};

export const deleteCourseHandler = async (req, res) => {
  await deleteCourse(req.params.id);
  res.redirect("/courses");
};
