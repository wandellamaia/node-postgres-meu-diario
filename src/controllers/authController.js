const express = require('express');
const getGenerateToken = require('./getToken');

const router = express.Router();

//import do arquivo que conecta com o banco
const pool = require('../database');

router.post('/authenticate', async (req,res) => {
    const {email, password} = req.body;
   
    let user = await (pool.query("SELECT email, senha,id FROM pessoa WHERE email = $1 AND senha= $2",
                        [email,password]));
    user = user.rows[0];
    //console.log("Usuário",user);
    if (!user)
        return res.status(400).send({error: 'User no found'});
    if (user.senha !== password) 
        return res.status(400).send({error: 'Senha invalida'});

    res.send({token: getGenerateToken(user)});
});

module.exports = app => app.use('/auth', router);