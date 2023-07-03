const express = require('express');

const ctrl = require('../controllers/users.controller');

const router = express.Router();

router.get('/', ctrl.getAll);

module.exports = router;
