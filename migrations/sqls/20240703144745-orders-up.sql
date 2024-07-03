CREATE TABLE orders (
    id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    user_id INT NOT NULL,
    status VARCHAR(10) DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id)
);