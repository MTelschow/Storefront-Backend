import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  CORSE_ORIGIN,
  SALT_ROUNDS,
  BCRYPT_PASSWORD,
  JWT_SECRET,
  ENV,
} = process.env;
