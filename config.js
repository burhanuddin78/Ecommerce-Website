import dotenv from 'dotenv';

require('dotenv').config();
export default {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: 'somethingsecret',
};
