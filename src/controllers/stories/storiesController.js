const express = require('express');
const authMiddleware = require('../../middlewares/auth');

//const jwt = require('jsonwebtoken');
//const authConfig = require('../../config/auth.json');

const router = express.Router();
const pool = require('../../database');

//const getId = require('../register/getId');

router.use(authMiddleware);

const page = () => {

};
router.post('/paged', async (req,res) => {
    const id = req.body.id;
    const page = req.body.page;
    
    const queryText = `SELECT * FROM relatos INNER JOIN image ON \
                    relatos.id=image.relatos_id WHERE relatos.pessoa_id =$1 \ 
                    LIMIT 5 OFFSET($2 - 1) * 5`;

    let stories = await (pool.query(queryText, [id,page]));
    stories = stories.rows;
    
    if (!stories)
        return res.status(400).send({error: 'User no found'});

    res.status(200).send({stories: stories});
});

module.exports = app => app.use('/recovery', router);