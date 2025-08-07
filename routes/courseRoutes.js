import express from "express";
import {
  listCourses,
  showCreateForm,
  createCourseHandler,
  showUpdateForm,
  updateCourseHandler,
  deleteCourseHandler,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", listCourses);
router.get("/create", showCreateForm);
router.post("/create", createCourseHandler);
router.get("/update/:id", showUpdateForm);
router.post("/update/:id", updateCourseHandler);
router.get("/delete/:id", deleteCourseHandler);

export default router;
