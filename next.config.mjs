/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
dotenv.config();


const nextConfig = {
    reactStrictMode: true,
    env: {
      MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    },
  };


export default nextConfig;
