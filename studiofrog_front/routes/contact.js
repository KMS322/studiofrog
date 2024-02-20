const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "public", "contactFiles");
const folderPath2 = path.join(__dirname, "..", "public", "contactFiles");

if (!fs.existsSync(folderPath2)) {
  fs.mkdirSync(folderPath2);
}
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, folderPath);
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
        // user: "studioofrog@gmail.com",
        // pass: "meaxttqwhmrgcmel",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: req.body.companyName,
      to: "kms930322@naver.com",
      subject: `STUDIOFROG WEB CONTACT By ${req.body.companyName}`,
      html: `<html><body>
        <p>회사명 또는 성함 : ${req.body.companyName}</p>
        <p>전화번호 : ${req.body.tel}</p>
        <p>이메일 : ${req.body.email}</p>
        <p>제작일정 : ${req.body.period}</p>
        <p>상담내용 : ${req.body.content}</p>
      </body></html>`,
    };

    if (req.body.selectedFileName) {
      mailOptions.attachments = [
        {
          path: `public/contactFiles/${req.body.selectedFileName}`,
        },
      ];
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        fs.unlinkSync(`public/contactFiles/${req.body.selectedFileName}`);
        res.status(200).send("Email sended");
      }
    });
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    fs.readdir(folderPath2, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return res.status(500).send("Internal Server Error");
      }

      files.forEach((file) => {
        const filePath = path.join(folderPath2, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted:", filePath);
          }
        });
      });

      res.status(200).send("deleted");
    });
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
