const express = require('express');
//import do arquivo que conecta com o banco
const pool = require('../database');

const router = express.Router();

router.post('/cadastrar', async (req,res) => {
    try {
        await pool.query('BEGIN')
        const queryText = 'INSERT INTO pessoa(nome,email,senha,genero,data_nascimento,estado_civil) \
            VALUES($1,$2,$3,$4,$5,$6) RETURNING id'
        const res = await pool.query(queryText, [req.body.nome,req.body.email,req.body.senha,
                    req.body.genero,req.body.data_nascimento,req.body.estado_civil]);
        console.log("Id -> ",res.rows[0].id);
        await pool.query('COMMIT')
      } catch (e) {
        await pool.query('ROLLBACK')
        throw e
      } finally {
        res.send({message: "ok"});
      }
});

router.get('/all', async (req,res) => {
    try {
        const results = await pool.query("SELECT * FROM pessoa");
        
        res.send({message: "ok", rows : results.rows });
        pool.end();
    } catch(e){
        res.status(400).send({error: 'Falha no registro'});
    }
});

router.post('./authenticate', async (req,res) => {
    const {email, password} = req.body;

    const user = await 


});

module.exports = app => app.use('/auth', router);