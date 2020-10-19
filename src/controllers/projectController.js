const express = require('express');
const authMiddleware = require('../middlewares/auth');

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const router = express.Router();
const pool = require('../database');
//const authConfig = require('../config/auth');

router.use(authMiddleware);

// router.get('/verify', (req, res) => {
//    res.send({ok: true, user: req.userId});
// })

router.post('/registerStory', async (req, res) => {
    console.log("COnsegui enrar",req.body.token);

    //teste para verificar o id
    jwt.verify(req.body.token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid'});
        console.log("Variavel -> ",decoded);
        req.userId = decoded.id;
        req.body.pessoa_id =  decoded.id;
    })
    try {
        await pool.query('BEGIN');
        console.log("Inicio");
        const queryText = 'INSERT INTO relatos(data_relato,humor,titulo,descricao,pessoa_id) \
                             VALUES($1,$2,$3,$4,$5) RETURNING id';
                             console.log("Query");
        let id = await pool.query(queryText, [req.body.data_relato,req.body.humor,req.body.titulo,
            req.body.descricao,req.body.pessoa_id]);
        console.log("Id relato -> ",id.rows[0].id);
        await pool.query('COMMIT')
        return res.status(200).send({status: true });
    } catch(e){
        await pool.query('ROLLBACK')
    }
 })
 
module.exports = app => app.use('/projects', router);