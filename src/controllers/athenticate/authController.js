const express = require('express');
const getGenerateToken = require('./getToken');

const router = express.Router();

//import do arquivo que conecta com o banco
const pool = require('../../database');

router.post('/recovery', async (req,res) => {
    const { email,password} = req.body;
   
    let user = await (pool.query(`UPDATE pessoa SET "senha"= $1 WHERE "email" =$2  RETURNING id`,
                        [password,email]));
    user = user.rows[0];
  
    if (!user)
        return res.status(400).send({error: 'User no found'});

    res.status(200).send({message: 'Senha alterada com sucesso.'});
});

router.post('/user', async (req,res) => {
    const {email} = req.body;
   
    let user = await (pool.query(`SELECT * FROM pessoa WHERE "email" = $1 `,
                        [email]));
    user = user.rows[0];
  
    if (!user)
        return res.status(400).send({error: 'User no found'});

    res.status(200).send({status: true});
});


router.post('/authenticate', async (req,res) => {
    const {email, password} = req.body;
   
    let user = await (pool.query(`SELECT * FROM pessoa WHERE "email" = $1 AND "senha"= $2`,
                        [email,password]));
    user = user.rows[0];
  
    if (!user)
        return res.status(400).send({error: 'User no found'});
    if (user.senha !== password) 
        return res.status(400).send({error: 'Senha invalida'});

    res.send({token: getGenerateToken(user)});
});

module.exports = app => app.use('/auth', router);