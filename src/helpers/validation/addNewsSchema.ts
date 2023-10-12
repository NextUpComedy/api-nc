import joi from 'joi';
// contentIds, userId

const addNewsSchema = joi.object({
  userId: joi.number().required(),
  title: joi.string().required(),
  newsContent: joi.string().required(),
  image: joi.string().required(),
  link: joi.string(),
});

export default addNewsSchema;
