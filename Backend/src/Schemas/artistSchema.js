import joi from "joi";

const ArtistValidate = new joi.object({
  name: joi.string().required().messages({
    "string.empty": "Please enter a name",
    "any.required": "Please enter name required",
  }),
  age: joi.number(),
  images: joi.array().messages({
    'string.base': 'Images must be a string',
  }),
  description: joi.string(),
  album: joi.array().items(joi.string()),
  songs: joi.array().items(joi.string()),
});

export default ArtistValidate;
