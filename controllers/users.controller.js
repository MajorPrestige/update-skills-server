const fs = require('fs').promises;
const path = require('path');

const { ctrlWrapper, RequestError } = require('../helpers');
const userSchema = require('../models/Users');

const contactsPath = path.join(__dirname, '../models', 'users.json');

const getAll = async (req, res) => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  res.json(result);
};

const updateUserFollowers = async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    throw RequestError(400, error.message);
  }

  const { userId } = req.params;
  const contacts = await getAll();
  const indexToUpdate = contacts.findIndex(el => el.id === userId);

  if (indexToUpdate === -1) {
    return null;
  }

  contacts[indexToUpdate] = { userId, ...req.body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  const result = contacts[indexToUpdate];

  if (!result) {
    throw RequestError(404, 'Contact not found');
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  updateUserFollowers: ctrlWrapper(updateUserFollowers),
};
