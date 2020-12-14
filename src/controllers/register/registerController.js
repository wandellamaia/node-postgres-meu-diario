const express = require('express');
const getGenerateToken = require('../athenticate/getToken');

const router = express.Router();
const pool = require('../../database');

router.post('/cadastrar', async (req,res) => {
    try {
        await pool.query('BEGIN')
   
        let user = await (pool.query(`SELECT * FROM pessoa WHERE "nome" = $1 `,
                            [req.body.nome]));
        user = user.rows[0];
          if (user) throw "";
        const queryText = 'INSERT INTO pessoa(nome,email,senha,genero,data_nascimento,estado_civil) \
            VALUES($1,$2,$3,$4,$5,$6) RETURNING id'

        user = await pool.query(queryText, [req.body.nome,req.body.email,req.body.senha,
                    req.body.genero,req.body.data_nascimento,req.body.estado_civil]);

        user = user.rows[0];
        
        await pool.query('COMMIT')
        return res.status(200).send({status: true ,message: "ok", token: getGenerateToken(user) });
      } catch (e) {
        await pool.query('ROLLBACK');
        return res.status(500).send({status: false });
      }
});

module.exports = app => app.use('/user', router);