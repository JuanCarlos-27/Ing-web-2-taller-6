import dotenv from 'dotenv';

const path = `./env/.env.${process.env.NODE_ENV.trim()}`;
dotenv.config({ path });
