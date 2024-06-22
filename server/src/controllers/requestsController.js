const requestsModel = require("../models/requestsModel");
const asyncHandler = require("../utils/asyncHandler");
const dbService = require("../utils/dbService");

exports.createAcademyRequest = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const alreadyRegistered = await dbService.findOne(requestsModel, {
    phone,
    academy: true,
  });
  if (alreadyRegistered) {
    return res.status(400).json({ message: "Already registered" });
  }
  req.body.academy = true;
  const newAcademy = await dbService.create(requestsModel, req.body);
  return res.success({ data: newAcademy });
});

exports.getAllAcademyRequests = asyncHandler(async (req, res) => {
  const academyRequests = await dbService.findMany(requestsModel, {
    academy: true,
  });
  return res.success({ data: academyRequests });
});

exports.createContactRequest = asyncHandler(async (req, res) => {
  req.body.contact = true;
  const newContact = await dbService.create(requestsModel, req.body);
  return res.success({ data: newContact });
});

exports.getAllContactRequests = asyncHandler(async (req, res) => {
  const contactRequests = await dbService.findMany(requestsModel, {
    contact: true,
  });
  return res.success({ data: contactRequests });
});

exports.createPropertyRequest = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const alreadyRegistered = await dbService.findOne(requestsModel, { phone });
  if (alreadyRegistered) {
    return res.status(400).json({ message: "Already registered" });
  }
  req.body.property = true;
  const newProperty = await dbService.create(requestsModel, req.body);
  return res.success({ data: newProperty });
});

exports.getAllPropertyRequests = asyncHandler(async (req, res) => {
  const propertyRequests = await dbService.findMany(requestsModel, {
    property: true,
  });
  return res.success({ data: propertyRequests });
});
