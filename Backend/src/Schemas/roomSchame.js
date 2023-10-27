import Joi from "joi";

export const roomSchame = Joi.object({
  nameGroup: Joi.string().required().messages({
    "string.empty": "Trường này không được để trống",
    "any.required": "Trường này là bắt buộc",
  }),
  password: Joi.string(),
  // room_image: Joi.array().required().empty().messages({
  //   "string.required": "image is Required",
  //   "string.empty": "image is not allowed to be empty",
  // }),
  memberGroup: Joi.array().items(Joi.string()),
});
