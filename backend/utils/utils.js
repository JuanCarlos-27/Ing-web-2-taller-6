import pool from '../config/db.js';
import cors from 'cors';

export const query = async (sql, values = []) => {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query(sql, values);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    connection.release();
  }
};

const ACCEPTED_ORIGINS = [];

if (process.env.NODE_ENV?.trim() === 'development') {
  ACCEPTED_ORIGINS.push('http://localhost:5173');
} else if (process.env.NODE_ENV?.trim() === 'production') {
  ACCEPTED_ORIGINS.push('https://landing-taller-6-jc.vercel.app');
}

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      console.log('origin', origin);
      console.log('acceptedOrigins', acceptedOrigins);

      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }
  });
