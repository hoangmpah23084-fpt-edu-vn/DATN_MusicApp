import joi from "joi";

export const genreValidate = joi.object({
  name: joi.string().required().messages({
    "string.empty": 'Trường "Genre" không được để trống',
    "any.required": 'Trường "Genre" là bắt buộc',
  }),
  list_songs: joi.array().items(joi.string()),
});
