const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
const locationController = require("../controllers/location");

router.post(
  "/",
  authenticateJWT,
  upload.single("locationImage"),
  locationController.create
);
router.get("/", locationController.readAll);
router.get("/:locationId", locationController.details);
router.put("/:locationId", authenticateJWT, upload.single("image"), locationController.update);
router.delete("/:locationId", authenticateJWT, locationController.delete);
router.get("/search/:name", authenticateJWT, locationController.getSeachByNameResult);

module.exports = router;
