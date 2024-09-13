const next = require("next");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mergeUsers = require("./server/mergeUsers");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const bodyParser = require('body-parser');
  server.use(bodyParser.json());

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = "public/images/uploads/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });

  server.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.status(200).send(`${req.file.filename}`);
  });

  server.post("/api/linkAccounts", async (req, res) => {
    const { newUserToken, oldUserToken } = req.body;
    try {
      await mergeUsers(newUserToken, oldUserToken, process.env.AUTH_SECRET);
    } catch (error) {
      console.log(error);
    }
    res.json({success: true})
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
