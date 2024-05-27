require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const notFound = require("./middlewares/not-found");

const coreRouter = require("./routes/core");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const queries = require("./databases/queries");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "A signature key." }));

app.use("/", coreRouter);
app.use("/auth/", authRouter);
app.use("/api/v1/users/", usersRouter);

app.use(notFound);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    queries.reset();
    queries.fill();
    app.listen(port, console.log(`Listening at http://localhost:${port}`));
  } catch (error) {
    console.error(error.message);
  }
};

start();

module.exports = app;
