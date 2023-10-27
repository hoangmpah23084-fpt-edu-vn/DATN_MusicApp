import multer from "multer";
//todo multer.diskStorage :: Đây là cấu hình lưu trữ (storage configuration) cho multer
const storage = multer.diskStorage({
  //todo diskStorage để định cấu hình việc lưu trữ tệp tin lên ổ đĩa của máy chủ.
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//! const upload = multer({storage: storage});: Đây là một thể hiện của multer middleware,
//! được cấu hình với storage bạn đã định nghĩa trước đó. Khi bạn sử dụng upload trong các
//!  tuyến đường (routes) của ứng dụng Express, nó sẽ giúp bạn xử lý tải lên tệp tin từ yêu cầu.
export default upload;
