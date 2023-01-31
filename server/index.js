import express from 'express';
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cors from "cors";
import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();


app.use(express.json())
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,Date.now()+ file.originalname)
  },
})

const upload = multer({  storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
 const file = req.file;
  return res.status(200).json(file.filename)
});


app.use("/api/posts", postRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes)


app.get("/test", (req, res) => {
  return res.json("Hello")
})

app.listen(8800, () => {
  console.log("Server Connected");
})