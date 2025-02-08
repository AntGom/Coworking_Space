import Joi from 'joi';
import imgSchema from '../imageSchema.js';

const spacePhotoSchema = Joi.object({
    photo: Joi.alternatives()
        .try(imgSchema, Joi.array().items(imgSchema))
        .required(),
});

export default spacePhotoSchema;

