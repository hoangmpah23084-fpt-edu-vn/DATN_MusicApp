import joi from "joi";

export const playlistSchema = joi.object({
  playlist_name: joi.string().required().messages({
    "string.empty": "Trường này không được để trống",
    "any.required": "Trường này là bắt buộc",
  }),
  id_user: joi.string().required().messages({
    "string.empty": "Trường này không được để trống",
    "any.required": "Trường này là bắt buộc",
  }),
});
