import multer from "multer"; //use multer to upload blob data
import fs from "fs"; //use the file system to save the files on the server
import cloudinary from "../Config/cloudinary.js";

export const UploadVideo = async (req, res) => {
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Lọc tệp để xác thực nếu nó đáp ứng phần mở rộng âm thanh bắt buộc
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Đặt bộ nhớ, bộ lọc tệp và kích thước tệp bằng multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    // cloudinary.v2.config({
    //   cloud_name: "dsbiugddk",
    //   api_key: "397545573884224",
    //   api_secret: "2BPHK1CLP_Yc8mQMV4ylPyJFzkI",
    // });
    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinary.v2.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },
      // Send cloudinary response or catch error
      (err, audio) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
};
