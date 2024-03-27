import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv"
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import commentRoute from "./routes/comments.js"

// constants
dotenv.config()
const port = process.env.PORT || 5000;
const app = express();


// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static("uploads"))

app.get("/", (req, res) => {
  res.json({message: "All is fine!"})
})

// Routes
app.use("/api/auth", authRoute )
app.use("/api/posts", postRoute )
app.use("/api/comments", commentRoute )




async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MG_USER}:${process.env.MG_PASSWORD}@cluster0.eff5kyc.mongodb.net/?retryWrites=true&w=majority`)
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  } catch (error) {
    console.log(error);
  }
}

start()

