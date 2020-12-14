const jwt = require('jsonwebtoken');

//import do arquivo que conecta com o banco
const authConfig = require('../../config/auth');


const getGenerateToken = (user) => {
    return jwt.sign({id: user.id},authConfig.secret,{
        expiresIn: 86400
    });
}

module.exports = getGenerateToken;