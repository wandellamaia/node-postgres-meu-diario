const express = require('express');
const authMiddleware = require('../../middlewares/auth');

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

const router = express.Router();
const pool = require('../../database');

const getId = require('../register/getId');

router.use(authMiddleware);

// router.get('/verify', (req, res) => {
//    res.send({ok: true, user: req.userId});
// })

router.post('/registerStory', async (req, res) => {
    //teste para verificar o id
    try {
        let pessoa_id;
        
        pessoa_id = getId(req.headers.authorization, res);

        await pool.query('BEGIN');
        
        const queryText = 'INSERT INTO relatos(data_relato,humor,titulo,descricao,pessoa_id) \
                             VALUES($1,$2,$3,$4,$5) RETURNING id';
        
        let id = await pool.query(queryText, [req.body.data_relato,req.body.humor,req.body.titulo,
            req.body.descricao,pessoa_id]);
        console.log("Id ->", id.rows[0].id);
        await pool.query('COMMIT')
        return res.status(200).send({status: true, id: id.rows[0].id });
    } catch(e){
        await pool.query('ROLLBACK')
        return res.status(500).send({status: false });
    }
 })
 
module.exports = app => app.use('/story', router);