const router = require("express").Router();

const requestsController = require("../controllers/requestsController");

router.post("/academy", requestsController.createAcademyRequest);

router.get("/academy", requestsController.getAllAcademyRequests);

router.post("/contact", requestsController.createContactRequest);

router.get("/contact", requestsController.getAllContactRequests);

router.post("/property", requestsController.createPropertyRequest);

router.get("/property", requestsController.getAllPropertyRequests);

module.exports = router;
