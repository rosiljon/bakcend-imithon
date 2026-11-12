const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());


async function connectToDatabase() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(" MongoDB Error:", error.message);
  }
}
connectToDatabase();
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Routes
const {Role}  = require("./routes/roleRoute");
app.use("/role", Role);
const { Stuff } = require("./routes/stuffRoute2");
app.use("/stuff", Stuff);
const { stuff_roles } = require("./routes/stuff_role3");
app.use("/stuff_roles", stuff_roles);
const { stages } = require("./routes/stageRoute");
app.use("/stages", stages);
const { branchs } = require("./routes/branchRoute");
app.use("/branchs", branchs);
const { groups } = require("./routes/groupRoute");
app.use("/groups", groups);
const { group_stuff } = require("./routes/group_stuffRoute");
app.use("/group_stuff", group_stuff);
const { student_group } = require("./routes/student_group");
app.use("/student_group", student_group);
const { lesson } = require("./routes/lessonRoute");
app.use("/lesson", lesson);
const { studentLessons } = require("./routes/studentLessonRoute");
app.use("/studentLessons", studentLessons);
const { payments } = require("./routes/paymentRoute");
app.use("/payments", payments);
const { lid } = require("./routes/lidRoute");
app.use("/lid", lid);
const { students } = require("./routes/studentRoute");
app.use("/students", students);
const { status } = require("./routes/lid_stuatusRouter");
app.use("/status", status);
const { reason_lid } = require("./routes/reason_lidRoute");
app.use("/reason_lid", reason_lid);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Api",
      version: "1.0.0",
      description: "Api Documentation using swagger",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./routes/*.js"],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));