const{TodoItem,TodoList} = require("../models");

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
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTasksById=async(req,res) => {
    try{
        const task = await TodoItem.findByPk(req.params.id);
        if(!task) {
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

exports.updateTask = async (req, res) => {
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
