import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // default layout path

// Expose current page for active menu highlighting
app.use((req, res, next) => {
  const pathName = req.path || "/";
  if (pathName === "/") {
    res.locals.page = "dashboard";
  } else if (pathName.startsWith("/courses")) {
    res.locals.page = "courses";
  } else if (pathName.startsWith("/students")) {
    res.locals.page = "students";
  } else if (pathName.startsWith("/instructors")) {
    res.locals.page = "instructors";
  }
  next();
});

// Routes

app.use("/", dashboardRoutes);
app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);
app.use("/instructors", instructorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
