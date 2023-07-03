const fs = require('fs').promises;
const path = require('path');

const { ctrlWrapper, RequestError } = require('../helpers');
const userSchema = require('../models/Users');

const usersPath = path.join(__dirname, '../models', 'users.json');

const getAll = async (req, res) => {
  const data = await fs.readFile(usersPath);
  const result = JSON.parse(data);
  res.json(result);
};

const updateUserFollowers = async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  const { id } = req.params;

  const data = await fs.readFile(usersPath);
  const users = JSON.parse(data);

  const indexToUpdate = users.findIndex(el => el.id === id);

  if (indexToUpdate === -1) {
    return null;
  }

  users[indexToUpdate] = { id, ...req.body };
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

  const result = users[indexToUpdate];

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  updateUserFollowers: ctrlWrapper(updateUserFollowers),
};
