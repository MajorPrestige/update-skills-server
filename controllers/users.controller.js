const fs = require('fs').promises;
const path = require('path');

const { ctrlWrapper } = require('../helpers');

const contactsPath = path.join(__dirname, '../models', 'users.json');

const getAll = async (req, res) => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
