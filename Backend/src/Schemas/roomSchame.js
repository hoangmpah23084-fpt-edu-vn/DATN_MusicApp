import Joi from "joi";

export const roomSchame = Joi.object({
  nameGroup: Joi.string().required().messages({
    "string.empty": "Trường này không được để trống",
    "any.required": "Trường này là bắt buộc",
  }),
  password: Joi.string(),
  memberGroup: Joi.array().items(Joi.string()),
});
