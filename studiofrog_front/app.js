const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const contactRouter = require("./routes/contact");
const db = require("./models");
const path = require("path");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.err);

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://studiofrog.kr",
      "http://211.110.229.116/",
    ],
    credentials: true,
  })
);
app.use(
  "/contactFiles",
  express.static(path.join(__dirname, "public", "contactFiles"))
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/contact", contactRouter);

const port = 3060;
app.listen(port, () => {
  console.log(`server on ${port}`);
});
