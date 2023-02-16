import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import multer from "multer";
import { readdirSync } from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/audio");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(bodyparser.json());
app.use("/static", express.static("public"));
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("DB work");
});

app.post(
  "/upload-audio",
  upload.array("audio", 10),
  (req: Request, res: Response) => {
    res.send("audio uploaded");
  }
);

app.get("/all-audio", (req: Request, res: Response) => {
  const files = readdirSync("public/audio");
  const audioPaths = files.map((file) => `/static/audio/${file}`);
  res.json(audioPaths);
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
