import joi from "joi";

const ArtistValidate = new joi.object({
  name: joi.string().required().messages({
    "string.empty": "Please enter a name",
    "any.required": "Please enter name required",
  }),
  age: joi.number(),
  images: joi.array().required().empty().messages({
    "string.required": "image is Required",
    "string.empty": "image is not allowed to be empty",
  }),
  description: joi.string(),
  album: joi.array().items(joi.string()),
  songs: joi.array().items(joi.string()),
});

export default ArtistValidate;
