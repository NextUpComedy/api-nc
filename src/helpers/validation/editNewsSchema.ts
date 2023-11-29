import joi from 'joi';
// contentIds, userId

const editNewsSchema = joi.object({
  id: joi.string().required(),
  userId: joi.number().required(),
  title: joi.string().required(),
  newsContent: joi.string().required(),
  image: joi.string(),
  link: joi.string(),
});

export default editNewsSchema;
