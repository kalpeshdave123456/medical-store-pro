CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  role TEXT,
  email TEXT UNIQUE,
  password TEXT
);

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  name TEXT,
  salt TEXT,
  category TEXT,
  qty INT,
  cost NUMERIC,
  price NUMERIC,
  expiry DATE,
  supplier TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  total NUMERIC,
  cost NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sale_items (
  id SERIAL PRIMARY KEY,
  sale_id INT,
  product_id INT,
  qty INT,
  price NUMERIC
);
