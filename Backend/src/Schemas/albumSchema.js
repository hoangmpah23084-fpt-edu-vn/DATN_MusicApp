import joi from "joi";

export const albumValidate = joi.object({
  album_name: joi.string().min(6).required().messages({
    "string.empty": 'Trường "Album" không được để trống',
    "any.required": 'Trường "Album" là bắt buộc',
  }),
  list_song: joi.string().messages({
    "string.empty": 'Trường "List Song" không được để trống',
    "any.required": 'Trường "List Song" là bắt buộc',
  }),
  id_singer: joi.string().required().messages({
    "string.empty": 'Trường "id_singer" không được để trống',
    "any.required": 'Trường "id_singer" là bắt buộc',
  }),
});
