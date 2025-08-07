import express from "express";
import {
  listStudents,
  showCreateForm,
  createStudentHandler,
  showUpdateForm,
  updateStudentHandler,
  deleteStudentHandler,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", listStudents);
router.get("/create", showCreateForm);
router.post("/create", createStudentHandler);
router.get("/update/:id", showUpdateForm);
router.post("/update/:id", updateStudentHandler);
router.get("/delete/:id", deleteStudentHandler);

export default router;
