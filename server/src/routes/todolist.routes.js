const express = require('express');
const router=express.Router();
const{createList,getLists,getListById,updateList,deleteList,generatePublicLink}=require('../controllers/todolist.controller');
const authMiddleware=require('../middleware/auth.middleware');

router.post("/", authMiddleware, createList);
router.get("/", authMiddleware, getLists);
router.get("/:id", authMiddleware, getListById);
router.put("/:id", authMiddleware, updateList);
router.delete("/:id", authMiddleware, deleteList);

router.patch("/:id/share", authMiddleware, generatePublicLink);

module.exports = router;