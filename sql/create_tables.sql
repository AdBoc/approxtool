-- psql -d postgres -U postgres -f create_tables.sql

CREATE DATABASE user_service;
CREATE DATABASE model_service;

\c user_service

CREATE TABLE users (
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE  NOT NULL,
    password VARCHAR(50)         NOT NULL,
    email    VARCHAR(255) UNIQUE NOT NULL
);

\c model_service

CREATE TABLE model (
    id SERIAL PRIMARY KEY,
    model VARCHAR(100) NOT NULL
);