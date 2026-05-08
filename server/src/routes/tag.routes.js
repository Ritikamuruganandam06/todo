const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTag,
  getTags,
  deleteTag,
} = require("../controllers/tag.controller");

router.post("/", authMiddleware, createTag);
router.get("/", authMiddleware, getTags);
router.delete("/:id", authMiddleware, deleteTag);
module.exports = router;