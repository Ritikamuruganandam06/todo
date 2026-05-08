require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
const {sequelize} = require('./models');
const authRoutes = require('./routes/auth.routes');
const todoListRoutes = require("./routes/todolist.routes");
const todoItemRoutes = require("./routes/todoitem.routes");
const tagRoutes = require("./routes/tag.routes");

app.get('/',(req,res) => {
    res.send('API running');
});

sequelize.sync({ alter: false })
    .then(() => console.log('db connected and tables synced'))
    .catch(err => console.error(err));

app.use('/api/auth',authRoutes);
app.use("/api/lists", todoListRoutes);
app.use("/api/tasks",todoItemRoutes);
app.use("/api/tags", tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});