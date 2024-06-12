const Joi = require('joi')
const multiLanguage = Joi.object({
  en: Joi.string().trim(),
  ar: Joi.string().trim()
});

const locationSchema = Joi.object({
  lat: Joi.string().required(),
  long: Joi.string().required()
});

const propertySchema = Joi.object({
 
  
  reference_No: Joi.string().optional(),
  
  name: multiLanguage,
  addressLocality: multiLanguage,
  
  min_price: Joi.string().required(),
  max_price: Joi.string().required(),
  
  currency: Joi.string().trim().required(),
  
  number_of_bathrooms: Joi.string().required(),
  number_of_bedrooms: Joi.string().required(),
  
  finishing: Joi.string().valid("Not Finished", "Semi Finished", "Finished", "Furnished").required().trim(),
  
  resale: Joi.string().default(false),
  
  property_type: Joi.object({
    name: Joi.string().trim()
  }),
  
  type: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()  
  ).optional(),
  
  delivery_in: Joi.string().optional(),
  
  sale_type: Joi.string().optional(),
  
  forSale: Joi.string().default(false),
  forRent: Joi.string().default(false),
  featured: Joi.string().default(false),
  
  contactUs: Joi.string().optional(),
  max_unit_area: Joi.string().optional(),
  
  location: locationSchema.required(),
  
  description: multiLanguage.optional(),
  
  area: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  ).optional(),
  
  compound: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  ).optional(),
  
  developer: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  ).optional(),
  
}).unknown(false)  
module.exports={
    propertySchema
}
// export default ;
