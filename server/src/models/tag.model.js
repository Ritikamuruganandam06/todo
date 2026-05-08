const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tags",
      timestamps: true,
    }
  );
  return Tag;
};