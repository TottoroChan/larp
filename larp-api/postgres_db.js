const postgres = require('pg');

const config = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'larp_db',
};

const pool = new postgres.Pool(config);

module.exports = pool;
