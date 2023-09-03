import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.required(),
  DEFAULT_LIMIT: Joi.number().default(10),
  DEFAULT_SEED_LIMIT: Joi.number().default(2000),
});
