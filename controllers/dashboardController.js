import db from "../config/db.js";

export const showDashboard = async (req, res) => {
  try {
    const [students] = await db
      .promise()
      .query("SELECT COUNT(*) AS total FROM students");
    const [instructors] = await db
      .promise()
      .query("SELECT COUNT(*) AS total FROM instructors");
    const [courses] = await db
      .promise()
      .query("SELECT COUNT(*) AS total FROM courses");
    const [categories] = await db.promise().query(`
      SELECT c.name, COUNT(cr.id) AS course_count
      FROM categories c
      LEFT JOIN courses cr ON cr.category_id = c.id
      GROUP BY c.id
    `);

    res.render("dashboard/index", {
      layout: "layouts/layout",
      title: "Dashboard",
      totalStudents: students[0].total,
      totalInstructors: instructors[0].total,
      totalCourses: courses[0].total,
      categoryStats: categories,
    });
  } catch (err) {
    res.status(500).send("Dashboard Error: " + err.message);
  }
};
