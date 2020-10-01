//Conexão com o banco de dados
const { Pool, Client } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',     
    password: 'novasenha',
    database: 'meu_diario',
    port: 5432,
});

//Conexão com o banco
pool.connect();
// const postgres = require('pg');
// const conString = "postgres://postgres:novasenha@localhost:5432/meu_diario"

// var client = new postgres.Client(conString);
// client.connect();

module.exports = pool;

