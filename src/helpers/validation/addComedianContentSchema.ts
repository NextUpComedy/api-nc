import joi from 'joi';
// contentIds, userId

const addComedianContentSchema = joi.object({
  contentIds: joi.array().items(joi.number()).required(),
  userId: joi.number().required(),
});

export default addComedianContentSchema;
