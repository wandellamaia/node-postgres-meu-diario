const jwt = require('jsonwebtoken');

//import do arquivo que conecta com o banco
const authConfig = require('../config/auth');


const getId = (authorization, res) => {
    jwt.verify(authorization.split(' ')[1], authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid  2'});
        pessoa_id =  decoded.id;
    });
    return pessoa_id;
}

module.exports = getId;