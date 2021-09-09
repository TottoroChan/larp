const pg = require('pg')

const pool = new pg.Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'larp_db',
});

module.exports = pool;
