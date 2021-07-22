CREATE DATABASE approx_tool;

\c approx_tool

CREATE TYPE user_roles AS ENUM ('admin', 'user');

CREATE TABLE public.users (
    id       SERIAL PRIMARY KEY,
    email    VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255)         NOT NULL,
    username VARCHAR(255) UNIQUE  NOT NULL,
    user_status user_roles NOT NULL,
    created_on timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE public.models (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(50)  NOT NULL,
    expression    VARCHAR(100) NOT NULL,
    lex_expression VARCHAR(200) NOT NULL,
    user_id integer REFERENCES users (id) ON DELETE CASCADE
);