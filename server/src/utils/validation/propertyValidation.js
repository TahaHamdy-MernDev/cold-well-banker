const Joi = require('joi')
const multiLanguage = Joi.object({
  en: Joi.string().trim(),
  ar: Joi.string().trim()
});

const locationSchema = Joi.object({
  lat: Joi.number().required(),
  long: Joi.number().required()
});

const propertySchema = Joi.object({
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required()
    })
  ).min(1).required(),
  
  thumbnail: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required()
    })
  ).min(1).required(),
  
  reference_No: Joi.number().optional(),
  
  name: multiLanguage.required(),
  addressLocality: multiLanguage.required(),
  
  min_price: Joi.number().required(),
  max_price: Joi.number().required(),
  
  currency: Joi.string().trim().required(),
  
  number_of_bathrooms: Joi.number().required(),
  number_of_bedrooms: Joi.number().required(),
  
  finishing: Joi.string().valid("Not Finished", "Semi Finished", "Finished", "Furnished").required().trim(),
  
  resale: Joi.boolean().default(false),
  
  property_type: Joi.object({
    name: Joi.string().trim().required()
  }).required(),
  
  type: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()  
  ).optional(),
  
  delivery_in: Joi.string().optional(),
  
  sale_type: Joi.string().optional(),
  
  forSale: Joi.boolean().default(false),
  forRent: Joi.boolean().default(false),
  featured: Joi.boolean().default(false),
  
  contactUs: Joi.number().optional(),
  max_unit_area: Joi.number().optional(),
  
  location: locationSchema.required(),
  
  description: multiLanguage.optional(),
  
  area: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()  
  ).optional(),
  
  compound: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()  
  ).optional(),
  
  developer: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  ).optional(),
  
}).unknown(false)  
module.exports={
    propertySchema
}
// export default ;
