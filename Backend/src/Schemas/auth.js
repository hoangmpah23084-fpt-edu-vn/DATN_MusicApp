import joi from "joi";

const signupSchema = joi.object({
  fullName: joi.string().required().messages({
    "string.empty": "Vui lòng nhập tên đầy đủ của bạn!",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Vui lòng nhập địa chỉ email!",
    "string.email": "Email chưa đúng định dạng",
    "any.required": "Email là bắt buộc",
  }),
  password: joi.string().required().min(4).messages({
    "string.empty": "Password không được để chống",
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "any.required": "Password là bắt buộc",
  }),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "string.empty": "Confirm Password không được để trống",
    "any.only": "Confirm Password không khớp",
    "any.required": "Confirm Password là bắt buộc",
  }),
  image: joi.object({
    url: joi.string(), 
    publicId: joi.string(),
  })
});

const signinSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email chưa đúng định dạng",
    "any.required": "Email là bắt buộc",
  }),
  password: joi.string().required().min(4).messages({
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "any.required": "Password là bắt buộc",
  }),
});

export { signupSchema, signinSchema };