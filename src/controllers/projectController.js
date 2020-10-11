const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const pool = require('../database');
//const authConfig = require('../config/auth');

router.use(authMiddleware);

// router.get('/verify', (req, res) => {
//    res.send({ok: true, user: req.userId});
// })

router.post('/resgisterStory', async (req, res) => {
    console.log("COnsegui enrar",req.body);
    try {
        await pool.query('BEGIN');
        console.log("Inicio");
        const queryText = 'INSERT INTO relatos(data_relato,humor,titulo,descricao,pessoa_id) \
                             VALUES($1,$2,$3,$4,$5) RETURNING id';
                             console.log("Query");
        let id = await pool.query(queryText, [req.body.data_relato,req.body.humor,req.body.titulo,
            req.body.descricao,req.body.pessoa_id]);
        console.log("Id relato -> ",req.body.id);
        await pool.query('COMMIT')
        return res.status(200).send({status: true });
    } catch(e){
        await pool.query('ROLLBACK')
    }
 })
 
module.exports = app => app.use('/projects', router);