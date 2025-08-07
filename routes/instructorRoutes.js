import express from "express";
import {
  listInstructors,
  showCreateForm,
  createInstructorHandler,
  showUpdateForm,
  updateInstructorHandler,
  deleteInstructorHandler,
} from "../controllers/instructorController.js";

const router = express.Router();

router.get("/", listInstructors);
router.get("/create", showCreateForm);
router.post("/create", createInstructorHandler);
router.get("/update/:id", showUpdateForm);
router.post("/update/:id", updateInstructorHandler);
router.get("/delete/:id", deleteInstructorHandler);

export default router;
