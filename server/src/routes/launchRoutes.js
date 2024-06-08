const {
  createLunch,
  latestLunches,
  getLunch,
  getDeveloperLaunches,
  getAllLaunches,
} = require("../controllers/launchController");
const multerConfig = require("../utils/multer");

const router = require("express").Router();


router.post(
  "/create",
  multerConfig.fields([{ name: "video" }, { name: "thumbnail" }]),
  createLunch
);
router.get("/developer-launch/:developerId", getDeveloperLaunches);
router.get("/get-all", getAllLaunches);
router.get("/get-latest", latestLunches);
router.get("/get/:lunchId", getLunch);

module.exports = router;
