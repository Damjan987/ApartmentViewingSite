const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");

router.get("/mostCommentedPost", userController.getMostCommentedPost);
router.get("/", userController.readAll);
router.get("/:userId", userController.read);
router.get(
  "/filter/:searchName/:searchMode/:loggedInUserId/:postId",
  userController.getUsersBySeachName
);
router.put(
  "/:userId",
  authenticateJWT,
  upload.single("profileImage"),
  userController.update
);
router.delete("/:userId", authenticateJWT, userController.delete);
router.get("/:userId/postCount", userController.getUsersPostCount);
router.get("/:userId/posts", userController.getUsersPosts);
router.put("/:userId/:postId/save", userController.savePost);
router.put("/:userId/:postId/unsave", userController.unsavePost);
router.get("/:userId/savedPosts", userController.getUsersSavedPosts);
router.put("/ban/:userId", userController.banUser);
router.put("/unban/:userId", userController.unbanUser);

module.exports = router;
