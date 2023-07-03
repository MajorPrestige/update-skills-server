const express = require('express');

const ctrl = require('../controllers/users.controller');

const router = express.Router();

router.get('/', ctrl.getAll);
router.put('/:id', ctrl.updateUserFollowers);

module.exports = router;
