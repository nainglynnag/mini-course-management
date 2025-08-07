import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from "../models/instructorModel.js";

export const listInstructors = async (req, res) => {
  const instructors = await getAllInstructors();
  res.render("instructors/index", { instructors });
};

export const showCreateForm = (req, res) => res.render("instructors/create");

export const createInstructorHandler = async (req, res) => {
  const { name, email } = req.body;
  await createInstructor(name, email);
  res.redirect("/instructors");
};

export const showUpdateForm = async (req, res) => {
  const instructor = await getInstructorById(req.params.id);
  res.render("instructors/update", { instructor });
};

export const updateInstructorHandler = async (req, res) => {
  const { name, email } = req.body;
  await updateInstructor(req.params.id, name, email);
  res.redirect("/instructors");
};

export const deleteInstructorHandler = async (req, res) => {
  await deleteInstructor(req.params.id);
  res.redirect("/instructors");
};
