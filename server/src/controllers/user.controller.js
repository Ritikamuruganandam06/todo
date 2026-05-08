const users = [];

const getUsers = (req, res) => {
  res.json(users);
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const user = { id: Date.now(), name, email };
  users.push(user);
  res.status(201).json(user);
};

module.exports = { getUsers, createUser };
