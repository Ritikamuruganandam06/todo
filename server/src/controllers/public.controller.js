const { TodoList, TodoItem, Tag } = require("../models");

exports.getPublicTodoList = async (req, res) => {
  try {
    const list = await TodoList.findOne({
      where: {
        publicToken: req.params.token,
        isPublic: true,
      },
      include: [
        {
          model: TodoItem,
          include: [
            {
              model: Tag,
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    if (!list) {
      return res.status(404).json({
        message: "Public list not found",
      });
    }

    res.status(200).json({
      isPublic: true,
      list,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
