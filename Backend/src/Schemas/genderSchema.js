import joi from "joi";

export const genreValidate = joi.object({
  genre_name: joi.string().min(6).required().messages({
    "string.empty": 'Trường "Genre" không được để trống',
    "string.min": 'Trường "Genre" trên 6 ký tự',
    "any.required": 'Trường "Genre" là bắt buộc',
  }),
  list_song: joi.array().items(joi.string()),
});
