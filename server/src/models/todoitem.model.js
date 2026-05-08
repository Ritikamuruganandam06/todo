const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const TodoItem = sequelize.define(
    "TodoItem",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
      },
    },
    {
      tableName: "todo_items",
      timestamps: true,

    }
  );

  return TodoItem;
};