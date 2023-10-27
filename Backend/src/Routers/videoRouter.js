import express from "express";
const Route_Video = express.Router();
import { UploadVideo } from "../Controllers/uploadController.js";

Route_Video.post("/upload/mp3", UploadVideo);

export default Route_Video;
