// server
// config/cloudinary.js
// import cloudinary from "cloudinary";

// const cloudinary = require("cloudinary");
// cloudinary.v2.config({
//   cloud_name: "dsbiugddk",
//   api_key: "397545573884224",
//   api_secret: "2BPHK1CLP_Yc8mQMV4ylPyJFzkI",
// });
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// const storage = new CloudinaryStorage(
//   {
//     cloudinary, 
//     allowedFormats: ['jpg', 'png'],


//   }
// )
export default cloudinary;
