const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('./user.model')(sequelize, DataTypes);
const TodoList = require('./todolist.model')(sequelize, DataTypes);
const TodoItem = require('./todoitem.model')(sequelize, DataTypes);
const Tag = require('./tag.model')(sequelize, DataTypes);
const TodoItemTag = require('./todoItemTag.model')(sequelize, DataTypes);

User.hasMany(TodoList, { foreignKey: 'userId' });
TodoList.belongsTo(User, { foreignKey: 'userId' });

TodoList.hasMany(TodoItem, { foreignKey: 'todoListId' });
TodoItem.belongsTo(TodoList, { foreignKey: 'todoListId' });

TodoItem.belongsToMany(Tag, { through: TodoItemTag, foreignKey: 'todoItemId' });
Tag.belongsToMany(TodoItem, { through: TodoItemTag, foreignKey: 'tagId' });

module.exports = { sequelize, User, TodoList, TodoItem, Tag, TodoItemTag };