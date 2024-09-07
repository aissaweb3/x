const next = require("next");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

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

  server.get("/api/pre/callback/:provider", (req, res) => {
    const { query, body, params } = req;
    console.log({ query, body, params });
    res.send("test")
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
