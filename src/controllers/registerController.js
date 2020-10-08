const express = require('express');
const getGenerateToken = require('./getToken');
//const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const pool = require('../database');

router.post('/cadastrar', async (req,res) => {
    try {
        await pool.query('BEGIN')
        const queryText = 'INSERT INTO pessoa(nome,email,senha,genero,data_nascimento,estado_civil) \
            VALUES($1,$2,$3,$4,$5,$6) RETURNING id'

        user = await pool.query(queryText, [req.body.nome,req.body.email,req.body.senha,
                    req.body.genero,req.body.data_nascimento,req.body.estado_civil]);

        user = user.rows[0];
       console.log(user);
        await pool.query('COMMIT')
        return res.status(200).send({status: true ,message: "ok", token: getGenerateToken(user) });
      } catch (e) {
        await pool.query('ROLLBACK')
      }
      //finally {
      //   res.send({message: "ok"});
      // }
});

module.exports = app => app.use('/', router);