import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../models/courseModel.js";
import { getAllInstructors } from "../models/instructorModel.js";

export const listCourses = async (req, res) => {
  const courses = await getAllCourses();
  res.render("courses/index", { courses });
};

export const showCreateForm = async (req, res) => {
  const instructors = await getAllInstructors();
  res.render("courses/create", { instructors });
};

export const createCourseHandler = async (req, res) => {
  const { title, description, instructor_id } = req.body;
  await createCourse(title, description, instructor_id);
  res.redirect("/courses");
};

export const showUpdateForm = async (req, res) => {
  const course = await getCourseById(req.params.id);
  const instructors = await getAllInstructors();
  res.render("courses/update", { course, instructors });
};

export const updateCourseHandler = async (req, res) => {
  const { title, description, instructor_id } = req.body;
  await updateCourse(req.params.id, title, description, instructor_id);
  res.redirect("/courses");
};

export const deleteCourseHandler = async (req, res) => {
  await deleteCourse(req.params.id);
  res.redirect("/courses");
};
