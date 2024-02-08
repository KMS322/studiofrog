const express = require("express");
const multer = require("multer");
const router = express.Router();
const { VideoList } = require("../models");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");
// const puppeteer = require("puppeteer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/contactFiles/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, decodeURIComponent(originalName));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { originalname: file_name } = req.file;
    const decodeFileName = decodeURIComponent(file_name);

    res.status(201).send(`${decodeFileName} 등록 완료`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const fileDatas = await VideoList.findAll({});
    if (fileDatas) {
      res.status(200).json(fileDatas);
    }
  } catch (error) {
    console.error(error);
    next();
  }
});

const getVideoTitle = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.youtube.com/watch?v=${videoId}`
    );
    const $ = cheerio.load(response.data);
    const title = $('meta[property="og:title"]').attr("content");
    return title;
  } catch (error) {
    console.error("Error fetching video title:", error);
    return null;
  }
};

router.post("/add", async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.urls.length; i++) {
      videoId = req.body.urls[i].match(/[?&]v=([^&]+)/)[1];
      let videoTitle;
      try {
        videoTitle = await getVideoTitle(videoId);
      } catch (error) {
        console.error("Error: ", error);
      }
      await VideoList.create({
        file_id: videoId,
        file_title: videoTitle,
        file_url: req.body.urls[i],
        type: "portfolio",
      });
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/changeMain", async (req, res, next) => {
  try {
    const videoId = req.body.mainUrl.match(/[?&]v=([^&]+)/)[1];
    const videoTitle = await getVideoTitle(videoId);
    const checkMain = await VideoList.findOne({
      where: { type: "main" },
    });
    if (checkMain) {
      await VideoList.update(
        {
          file_id: videoId,
          file_title: videoTitle,
          file_url: req.body.mainUrl,
          type: "main",
        },
        { where: { type: "main" } }
      );
    } else {
      await VideoList.create({
        file_id: videoId,
        file_title: videoTitle,
        file_url: req.body.mainUrl,
        type: "main",
      });
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/changeAbout", async (req, res, next) => {
  try {
    const videoId = req.body.aboutUrl.match(/[?&]v=([^&]+)/)[1];
    const videoTitle = await getVideoTitle(videoId);
    const checkAbout = await VideoList.findOne({
      where: { type: "about" },
    });
    if (checkAbout) {
      await VideoList.update(
        {
          file_id: videoId,
          file_title: videoTitle,
          file_url: req.body.aboutUrl,
          type: "about",
        },
        { where: { type: "about" } }
      );
    } else {
      await VideoList.create({
        file_id: videoId,
        file_title: videoTitle,
        file_url: req.body.aboutUrl,
        type: "about",
      });
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const deletedData = await VideoList.destroy({
      where: { id: req.body.id },
    });

    res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
    next();
  }
});
module.exports = router;
