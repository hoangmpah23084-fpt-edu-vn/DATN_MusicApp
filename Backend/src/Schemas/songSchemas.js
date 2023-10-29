import joi from "joi";

export const Validate_Song = joi.object({
  _id: joi.string(),
  song_name: joi.string().required().empty().messages({
    "string.required": "name is Required",
    "string.emtpy": "name is not allowed to be empty",
    "string.base": "name must be a string",
  }),
  song_link: joi.string().required().empty().messages({
    "string.required": "title is Required",
    "string.emtpy": "Link is not allowed to be empty",
    "string.base": "name must be a string",
  }),
  song_image: joi.array().required().empty().messages({
    "string.required": "image is Required",
    "string.empty": "image is not allowed to be empty",
  }),
  song_singer: joi.string().required().empty().messages({
    "string.required": "singer is Required",
    "string.empty": "singer is not allowed to be empty",
    "string.base": "name must be a string",
  }),
  song_lyric: joi.string().required().empty().messages({
    "string.required": "lyric is Required",
    "string.empty": "lyric is not allowed to be empty",
    "string.base": "lyric must be a string",
  }),
  id_Genre: joi.string().required().messages({
    "string.required": "Id_Genre is Required",
  }),
  id_Artists: joi.string().required().messages({
    "string.required": "Id_Genre is Required",
  }),
});
