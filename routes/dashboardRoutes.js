import express from "express";
import { showDashboard } from "../controllers/dashboardController.js";

const router = express.Router();
router.get("/", showDashboard);
export default router;
