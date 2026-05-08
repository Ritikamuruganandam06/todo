const { DataTypes } = require("sequelize");
module.exports=(sequelize) => {
  const TodoItemTag = sequelize.define(
    "TodoItemTag",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      tableName: "todo_item_tags",
      timestamps: false,
    }
  );
  return TodoItemTag;
};