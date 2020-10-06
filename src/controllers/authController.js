const express = require('express');
const jwt = require('jsonwebtoken');
const { hash } = require('bcryptjs');
const router = express.Router();

//import do arquivo que conecta com o banco
const pool = require('../database');
const authConfig = require('../config/auth');


const getGenerateToken = (user) => {
    console.log("gerei ->",user.id);
    return jwt.sign({id: user.id},authConfig.secret,{
        expiresIn: 86400
    });
}

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

router.post('/authenticate', async (req,res) => {
    const {email, password} = req.body;

    let user = await (await pool.query("SELECT email, senha,id FROM pessoa"));
    user = user.rows[0];
    console.log("Usuário",user.id);
    if (!user)
        return res.status(400).send({error: 'User no found'});
    
    const token = jwt.sign({id: user.id},authConfig.secret,{
        expiresIn: 86400
    });

    res.send({user, token: getGenerateToken(user)});
});

module.exports = app => app.use('/auth', router);