const next = require("next");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mergeUsers = require("./server/mergeUsers");
const createReferral = require("./server/createReferral");
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
    console.log("wants to link accounts");
    try {
      
    const { newUserToken } = req.body;
    const oldUserToken = req.body.oldUserToken;
    if (!oldUserToken) return res.json({success: false})
    
    
    try {
      await mergeUsers(newUserToken, oldUserToken, process.env.AUTH_SECRET);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
   console.log(error);
      
  }
    res.json({success: true})
  });

  server.post("/api/createReferral", async (req, res) => {
    console.log("referral");
    
    const { token } = req.body;
    const referralToken = req.body.referralToken;
    if (!referralToken) return res.json({success: true})
    try {
      await createReferral(token, referralToken, process.env.AUTH_SECRET);
    } catch (error) {
      console.log(error);
    }
    res.json({success: true})
  });

  const telegramRouter = require("./server/telegramRouter.js")
  server.use("/", telegramRouter)
  server.get("/test", (req,res)=>{
    res.send("test")
  })

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
