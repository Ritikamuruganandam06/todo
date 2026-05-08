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
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      reminderDate: {
    type: DataTypes.DATE,
      },
    reminderSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
      },
    },
    {
      tableName: "todo_items",
      timestamps: true,
    }
  );

  return TodoItem;
};