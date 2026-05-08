const {TodoItem,Tag,TodoItemTag} = require("../models");
const { Op } = require("sequelize");

exports.getTodoListStats = async (req, res) => {
  try {
    const { listId } = req.params;
    const totalTasks = await TodoItem.count({
      where: {
        todoListId: listId,
      },
    });
    const completedTasks = await TodoItem.count({
      where: {
        todoListId: listId,
        isCompleted: true,
      },
    });

    const pendingTasks = await TodoItem.count({
      where: {
        todoListId: listId,
        isCompleted: false,
      },
    });

    const taggedTasks = await Tag.findAll({
      attributes: [
        "id",
        "name",
      ],

      include: [
        {
          model: TodoItem,
          where: {
            todoListId: listId,
          },
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],

      group: ["Tag.id"],
      raw: true,
    });

    const tagStats = [];
    for (const tag of taggedTasks) {
      const count = await TodoItem.count({
        include: [
          {
            model: Tag,
            where: {
              id: tag.id,
            },
            through: {
              attributes: [],
            },
          },
        ],

        where: {
          todoListId: listId,
        },
      });

      tagStats.push({
        tag: tag.name,
        count,
      });
    }

    const allTaggedTaskIds = await TodoItemTag.findAll({
      attributes: ["todoItemId"],
      raw: true,
    });

    const taggedIds = allTaggedTaskIds.map(
      item => item.todoItemId
    );

    const noTagCount = await TodoItem.count({
      where: {
        todoListId: listId,

        id: {
          [Op.notIn]: taggedIds.length
            ? taggedIds
            : ["00000000-0000-0000-0000-000000000000"],
        },
      },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,

      tags: [
        ...tagStats,
        {
          tag: "no tag",
          count: noTagCount,
        },
      ],
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });

  }
};