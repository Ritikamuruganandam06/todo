const express = require('express');
const router=express.Router();
const{createList,getLists,getListById,updateList,deleteList}=require('../controllers/todolist.controller');
router.post