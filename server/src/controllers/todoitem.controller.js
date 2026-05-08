const {TodoItem,TodoList,Tag} = require("../models");

exports.createTask=async(req,res) => {
    try{
        const{
            title,description,dueDate,priority,todoListId,
        }=req.body;
         const list = await TodoList.findOne({
      where: {
        id: todoListId,
        userId: req.user.id,
      },
    });
    if(!list){
      return res.status(404).json({
        message: "Todo list not found",
      });
    }
    const task = await TodoItem.create({
      title,
      description,
      dueDate,
      priority,
      todoListId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTasksByList = async(req, res) =>{
  try{
    const tasks = await TodoItem.findAll({
      where: {
        todoListId: req.params.listId,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTaskById=async(req,res) => {
    try{
        const task = await TodoItem.findByPk(req.params.id);
        if(!task){
            return res.status(404).json({
                message:"task not found",
            });
        }
        res.status(200).json(task);
    }
    catch(error) {
        res.status(500).json({
            message:error.message,
        });
    }
};

exports.updateTask = async(req, res) => {
  try {
    const task = await TodoItem.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await task.update(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try{
    const task = await TodoItem.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await task.destroy();
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await TodoItem.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.renameTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await TodoItem.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignTagsToTask = async (req, res) => {
  try {
    const { tagIds } = req.body;
    const task = await TodoItem.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const tags = await Tag.findAll({ where: { id: tagIds } });
    await task.addTags(tags);
    res.status(200).json({ message: "Tags assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterTasksByTag = async (req, res) => {
  try {
    const tasks = await TodoItem.findAll({
      include: [
        {
          model: Tag,
          where: { id: req.params.tagId },
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
