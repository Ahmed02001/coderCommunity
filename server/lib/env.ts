import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const ENV = {
  SECRT_JWT: process.env.JWT_SECRET_KEY,
};

export default ENV;
