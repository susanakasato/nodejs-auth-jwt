const express = require("express");
const { projectRouter } = require("./src/routes/projectRouter");
const { homeRouter } = require("./src/routes/homeRouter");
const { userRouter } = require("./src/routes/userRouter");

const app = express();
app.use(express.json());
app.use("/home", homeRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.listen(3000);