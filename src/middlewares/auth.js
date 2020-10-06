//No middleware a gente verifica se o token será aceito pela aplicaçao ou não
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//header
module.exports = (req, res, next) => {
    //next só chama se o usuário estuver pronto para o proximo passo
    //next();
    //Buscando o header de autorização
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({error: 'No token provided'});

    const parts = authHeader.split(' ');

    if (!(parts.length === 2))
        return res.status(401).send({error: 'Token error'});

    const [scheme, token] = parts;//recebe bearer e token

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token malformated'});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid'});
        console.log("Variavel -> ",decoded);
        req.userId = decoded.id;
        return next();
    })
};