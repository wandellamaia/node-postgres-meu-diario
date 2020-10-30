const express = require('express');

const router = express.Router();
const pool = require('../database');

router.post('/register', async (req,res) => {
    //console.log("Cheguei aqui");
   
   const id = req.body.id;
  //console.log("Objeto ->", req.body.documents);
    
    const queryText = 'INSERT INTO image(fileBase64,fileName,contentType,relatos_id) VALUES($1,$2,$3,$4) RETURNING id';

    await req.body.documents.forEach(async element => {
        //console.log("Teste ->",element.base64);
        try {
            let user = await pool.query(queryText, [element.base64,element.fileName,element.targetContentType, id]);
            await pool.query('COMMIT');
            user = user.rows[0];
            console.log(user);
            return res.status(200).send({status: true ,message: "ok" });
        } catch (e) {
            await pool.query('ROLLBACK');
           // console.log("Erro");
            return res.status(500).send({status: false });
        }
   });
    
    // documents.map(document => {
    //     try {
    //         //console.log("teste ->", req.body);
    //         pool.query('BEGIN')
    //         const queryText = 'INSERT INTO images(image,relatos_id) VALUES($1,$2) RETURNING id';
    
    //         let user = pool.query(queryText, [document, req.body.id]);
    //         console.log("teste pos query ->", user);
    //         user = user.rows[0];
    //         console.log("teste ->", user);
    //         await pool.query('COMMIT')
    //         return res.status(200).send({status: true ,message: "ok" });
    //       } catch (e) {
    //         await pool.query('ROLLBACK');
    //         return res.status(500).send({status: false });
    //       }
    // });
    // try {
    //     //console.log("teste ->", req.body);
    //     await pool.query('BEGIN')
    //     const queryText = 'INSERT INTO images(image,relatos_id) VALUES($1,$2) RETURNING id'

    //     let user = await pool.query(queryText, [req.body.image, req.body.relatos_id]);
    //     console.log("teste pos query ->", user);
    //     user = user.rows[0];
    //     console.log("teste ->", user);
    //     await pool.query('COMMIT')
    //     return res.status(200).send({status: true ,message: "ok" });
    //   } catch (e) {
    //     await pool.query('ROLLBACK');
    //     return res.status(500).send({status: false });
    //   }
});

module.exports = app => app.use('/image', router);