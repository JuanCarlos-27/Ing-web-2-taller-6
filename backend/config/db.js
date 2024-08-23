import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  port: process.env.DB_PORT,
  waitForConnections: true,
  queueLimit: 0
});

console.log(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    port: process.env.DB_PORT

  }
);

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log('💪 Se conecto correctamente a la Base de datos');
  })
  .catch((err) => {
    console.log('🔴 Ha ocurrido un error al conectar a la base de datos');
    console.log(err);
  });

export default pool;
