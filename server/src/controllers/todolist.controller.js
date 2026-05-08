const { TodoList } = require("../models");

exports.createList = async (req, res) => {
  try {
    const{title,description,isPublic}=req.body;
    const list = await TodoList.create({
      title,
      description,
      isPublic,
      userId: req.user.id,
    });

    res.status(201).json(list);
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getLists = async (req, res) => {
  try{
    const lists = await TodoList.findAll({
      where:{
        userId: req.user.id,
      },
    });

    res.status(200).json(lists);
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getListById = async (req, res) => {
  try{
    const list = await TodoList.findOne({
      where:{
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if(!list){
      return res.status(404).json({
        message: "List not found",
      });
    }

    res.status(200).json(list);
  } catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateList = async (req, res) => {
  try {
    const list = await TodoList.findOne({
      where:{
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if(!list){
      return res.status(404).json({
        message: "List not found",
      });
    }

    await list.update(req.body);

    res.status(200).json(list);
  } catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const list = await TodoList.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!list){
      return res.status(404).json({
        message: "List not found",
      });
    }

    await list.destroy();

    res.status(200).json({
      message: "List deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};