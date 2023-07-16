const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
const tagController = require("../controllers/tag");

router.post(
  "/",
  authenticateJWT,
  upload.single("tagImage"),
  tagController.create
);
router.get("/", tagController.readAll);
router.get("/:tagId", tagController.details);
router.put("/:tagId", authenticateJWT, upload.single("image"), tagController.update);
router.delete("/:tagId", authenticateJWT, tagController.delete);
router.get(
  "/search/:name",
  authenticateJWT,
  tagController.getSeachByNameResult
);

module.exports = router;
