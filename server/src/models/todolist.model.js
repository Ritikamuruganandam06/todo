const {DataTypes} = require('sequelize');
module.exports=(sequelize,DataTypes) => {
    const TodoList = sequelize.define("TodoList", {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        description:{
            type:DataTypes.TEXT,
        },
        isPublic:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
        },
        publicToken:{
            type:DataTypes.STRING,
            unique:true,
        },
    },
    {
    tableName:"todo_lists",
    timestamps:true,
    }
);
return TodoList;
};