import bcrypt from "bcrypt";
import { SALT_ROUNDS, BCRYPT_PASSWORD } from "../utils/env";

const saltRounds = parseInt(SALT_ROUNDS || "10");
const pepper = BCRYPT_PASSWORD || "default";

const hashPassword = (password: string): string => {
  const hashed_password = bcrypt.hashSync(password + pepper, saltRounds);
  return hashed_password;
};

const matchPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password + pepper, hash as string);
};

export { hashPassword, matchPassword };
