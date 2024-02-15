const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const contactRouter = require("./routes/contact");
const kakaoRouter = require("./routes/kakao");
const db = require("./models");
const passportConfig = require("./passport");
const path = require("path");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.err);

passportConfig();

app.use(
  cors({
    origin: ["http://localhost", "http://115.85.183.166"],
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
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/contact", contactRouter);
app.use("/kakao", kakaoRouter);
// app.use((err, req, res, next) => {
//   // 에러 처리 미들웨어
// });
const port = 3060;
app.listen(port, () => {
  console.log(`${port}에서 서버 실행 중`);
});
