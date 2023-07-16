const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
const postController = require("../controllers/post");

router.post(
  "/",
  authenticateJWT,
  upload.array("postImages"),
  postController.create
);
router.get("/", postController.readAll);
router.get("/location/:locationId", postController.getPostsByLocation);
router.get("/:postId", postController.details);
router.put("/:postId", authenticateJWT, postController.update);
router.delete("/:postId/:ownerId", authenticateJWT, postController.delete);
router.post("/:postId/:userId/postComment", postController.postComment);
router.get("/:postId/:loggedInUserId/comments", postController.getPostsComments);
router.delete("/comment/:commentId/:postId/delete", postController.deleteComment);

module.exports = router;