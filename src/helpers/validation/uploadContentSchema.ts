import joi from 'joi';
// contentIds, userId

const uploadContentSchema = joi.object({
  userId: joi.number().required(),
  text: joi.string().required(),
  link: joi.string().required(),
  type: joi.string().required(),
});
export default uploadContentSchema;
