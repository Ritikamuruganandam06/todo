const express = require("express");
const router = express.Router();
const { getPublicTodoList } = require("../controllers/public.controller");

router.get("/:token", getPublicTodoList);

module.exports = router;
