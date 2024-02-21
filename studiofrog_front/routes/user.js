const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["admin_pw"],
        },
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        admin_id: req.body.adminId,
      },
    });
    if (exUser) {
      return res.status(403).send("회원가입을 할 수 없습니다.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.adminPw, 12);
      const createdUser = await User.create({
        admin_id: req.body.adminId,
        admin_pw: hashedPassword,
      });
    }

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        admin_id: req.body.adminId,
      },
    });
    if (!user) {
      res.status(300).send("등록된 아이디가 아닙니다.");
    }
    const result = await bcrypt.compare(req.body.adminPw, user.admin_pw);
    if (result) {
      res.status(200).json(user);
    } else {
      res.status(401).send("비밀번호가 틀렸습니다.");
    }
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/checkId", isNotLoggedIn, async (req, res, next) => {
  try {
    if (req.body.user_member_id) {
      const sameIdUser = await User.findOne({
        where: {
          user_member_id: req.body.user_member_id,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    } else if (req.body.business_member_id) {
      const sameIdUser = await User.findOne({
        where: {
          user_member_id: req.body.business_member_id,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    }

    return res.status(200).send("사용하실 수 있는 아이디 입니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
