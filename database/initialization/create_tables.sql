CREATE DATABASE approx_tool;

\c approx_tool

CREATE TYPE user_roles AS ENUM ('ADMIN', 'USER');

CREATE TABLE public.users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    username    VARCHAR(100) UNIQUE NOT NULL,
    user_status user_roles NOT NULL,
    created_on  timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE public.models (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100) UNIQUE NOT NULL,
    expression     VARCHAR(255) NOT NULL,
    lex_expression VARCHAR(255) NOT NULL,
    tag            VARCHAR(50) NOT NULL,
    user_id        integer REFERENCES users (id) ON DELETE CASCADE
);

CREATE ROLE approx_user WITH LOGIN PASSWORD 'user_pass';
GRANT SELECT, INSERT, UPDATE, DELETE, SELECT ON TABLE users TO approx_user;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO approx_user;

CREATE ROLE approx_model WITH LOGIN PASSWORD 'model_pass';
GRANT SELECT, INSERT, UPDATE, DELETE, SELECT ON TABLE models TO approx_model;
GRANT USAGE, SELECT ON SEQUENCE models_id_seq TO approx_model;