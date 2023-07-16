const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
const typeController = require("../controllers/type");

router.post(
  "/",
  authenticateJWT,
  upload.single("typeImage"),
  typeController.create
);
router.get("/", typeController.readAll);
router.get("/:typeId", typeController.details);
router.put("/:typeId", authenticateJWT, upload.single("image"), typeController.update);
router.delete("/:typeId", authenticateJWT, typeController.delete);
router.get(
  "/search/:name",
  authenticateJWT,
  typeController.getSeachByNameResult
);

module.exports = router;
