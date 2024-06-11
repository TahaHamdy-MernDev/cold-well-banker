const Joi = require("joi");

const createAreaSchema = Joi.object({
    title: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Title (English) must be a string',
          'string.empty': 'Title (English) is required',
        }),
        ar: Joi.string().required().messages({
          'string.base': 'Title (Arabic) must be a string',
          'string.empty': 'Title (Arabic) is required',
        }),
      }).required(),
      description: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Description (English) must be a string',
          'string.empty': 'Description (English) is required',
        }),
        ar: Joi.string().required().messages({
          'string.base': 'Description (Arabic) must be a string',
          'string.empty': 'Description (Arabic) is required',
        }),
      }).required(),
      callUsNumber: Joi.string().required().messages({
        'string.base': 'Call Us Number must be a string',
        'string.empty': 'Call Us Number is required',
      }),
      location: Joi.object({
        lat: Joi.string().required().messages({
          'string.base': 'Latitude must be a string',
          'any.required': 'Latitude is required',
        }),
        long: Joi.string().required().messages({
          'string.base': 'Longitude must be a string',
          'any.required': 'Longitude is required',
        }),
      }).required(),
  launches: Joi.array().items(Joi.string().hex().length(24)).optional(),
  developers: Joi.array().items(Joi.string().hex().length(24)).optional(),
  compounds: Joi.array().items(Joi.string().hex().length(24)).optional(),
  properties: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const updateAreaSchema = Joi.object({
    title: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Title (English) must be a string',
          'string.empty': 'Title (English) is required',
        }),
        ar: Joi.string().required().messages({
          'string.base': 'Title (Arabic) must be a string',
          'string.empty': 'Title (Arabic) is required',
        }),
      }).required(),
      propertiesAvailable: Joi.number().required().messages({
        'number.base': 'Properties Available must be a number',
        'any.required': 'Properties Available is required',
      }),
      description: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Description (English) must be a string',
          'string.empty': 'Description (English) is required',
        }),
        ar: Joi.string().required().messages({
          'string.base': 'Description (Arabic) must be a string',
          'string.empty': 'Description (Arabic) is required',
        }),
      }).required(),
      callUsNumber: Joi.string().required().messages({
        'string.base': 'Call Us Number must be a string',
        'string.empty': 'Call Us Number is required',
      }),
      images: Joi.array()
        .items(
          Joi.object({
            url: Joi.string().uri().required().messages({
              'string.uri': 'Image URL must be a valid URI',
              'any.required': 'Image URL is required',
            }),
          })
        )
        .required()
        .messages({
          'array.base': 'Images must be an array of objects',
          'any.required': 'Images are required',
        }),
      location: Joi.object({
        lat: Joi.number().required().messages({
          'number.base': 'Latitude must be a number',
          'any.required': 'Latitude is required',
        }),
        long: Joi.number().required().messages({
          'number.base': 'Longitude must be a number',
          'any.required': 'Longitude is required',
        }),
      }).required(),  title: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Title (English) must be a string',
          'string.empty': 'Title (English) is required',
        }),
        ar: Joi.string().required().messages({
          'string.base': 'Title (Arabic) must be a string',
          'string.empty': 'Title (Arabic) is required',
        }),
      }).required(),
      propertiesAvailable: Joi.number().required().messages({
        'number.base': 'Properties Available must be a number',
        'any.required': 'Properties Available is required',
      }),
      description: Joi.object({
        en: Joi.string().required().messages({
          'string.base': 'Description (English) must be a string',
          'string.empty': 'Description (English) is required',
        }),
        ar: Joi.string().required().messages({
          'string.base': 'Description (Arabic) must be a string',
          'string.empty': 'Description (Arabic) is required',
        }),
      }).required(),
      callUsNumber: Joi.string().required().messages({
        'string.base': 'Call Us Number must be a string',
        'string.empty': 'Call Us Number is required',
      }),
      location: Joi.object({
        lat: Joi.number().required().messages({
          'number.base': 'Latitude must be a number',
          'any.required': 'Latitude is required',
        }),
        long: Joi.number().required().messages({
          'number.base': 'Longitude must be a number',
          'any.required': 'Longitude is required',
        }),
      }).required(),
  launches: Joi.array().items(Joi.string().hex().length(24)).optional(),
  developers: Joi.array().items(Joi.string().hex().length(24)).optional(),
  compounds: Joi.array().items(Joi.string().hex().length(24)).optional(),
  properties: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

module.exports = {
  createAreaSchema,
  updateAreaSchema,
};
