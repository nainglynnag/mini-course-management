import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import courseRoutes from "./routes/courseRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";

const app = express();
const PORT = 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/courses", courseRoutes);
app.use("/instructors", instructorRoutes);

// Home redirect
app.get("/", (req, res) => {
  res.redirect("/courses");
});

app.get("/instructors", (req, res) => {
  res.redirect("/instructors");
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
