//Conexão com o banco de dados
const { Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',     
    password: 'novasenha',
    database: 'meu_diario',
    port: 5432,
});

//Conexão com o banco
pool.connect();


module.exports = pool;

