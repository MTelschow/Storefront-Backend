CREATE TABLE users (
    id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password_digest VARCHAR NOT NULL
);