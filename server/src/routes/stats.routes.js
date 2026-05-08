const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const {
  getTodoListStats,
} = require("../controllers/stats.controller");

router.get("/:listId/stats",authMiddleware,getTodoListStats
);

module.exports = router;