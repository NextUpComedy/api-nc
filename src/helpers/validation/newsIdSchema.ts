import joi from 'joi';
// contentIds, userId

const editNewsSchema = joi.object({
  newsId: joi.string().required(),
});

export default editNewsSchema;
