const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "public", "contactFiles");

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, folderPath);
    console.log("multer가 실행");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("image");

router.post("/", async (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      console.log(error);
      return res.end("Something wrong");
    } else {
    }
  });
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "creamoff2021@gmail.com",
        pass: "ktdldgctfcczdfmy",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: req.body.name,
      to: "kms930322@naver.com",
      subject: `STUDIOFROG WEB CONTACT By ${req.body.name}`,
      html: `<html><body>
      <p>프로젝트 용도 : ${req.body.projectPurpose}</p>
      <p>프로젝트 명 : ${req.body.projectName}</p>
      <p>회사명 : ${req.body.companyName}</p>
      <p>당담자 성함 및 직함 : ${req.body.name}</p>
      <p>전화번호 : ${req.body.tel}</p>
      <p>이메일 : ${req.body.email}</p>
      <p>제작예산 : ${req.body.budget}</p>
      <p>제작일정 : ${req.body.period}</p>
      <p>상담내용 : ${req.body.content}</p>
      </body></html>`,
      attachments: [
        {
          path: `public/contactFiles/${req.body.selectedFileName}`,
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email Send " + info.response);
        fs.unlinkSync(`public/contactFiles/${req.body.selectedFileName}`);
        res.status(200).send("Email sended");
      }
    });
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
