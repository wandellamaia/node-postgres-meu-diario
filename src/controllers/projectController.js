const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const pool = require('../database');
const authConfig = require('../config/auth');

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ok: true, user: req.userId});
})

module.exports = app => app.use('/projects', router);