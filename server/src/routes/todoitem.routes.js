const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  createTask,
  toggleTaskStatus,
  renameTask,
  deleteTask,
  assignTagsToTask,
  filterTasksByTag,
  reorderTasks,
} = require("../controllers/todoitem.controller");

router.post("/", authMiddleware, createTask);
router.patch("/:id/status", authMiddleware, toggleTaskStatus);
router.patch("/:id/rename", authMiddleware, renameTask);
router.delete("/:id", authMiddleware, deleteTask);
router.post("/:id/tags", authMiddleware, assignTagsToTask);
router.patch("/reorder", authMiddleware, reorderTasks);
router.get("/filter/tag/:tagId", authMiddleware, filterTasksByTag);
module.exports = router;