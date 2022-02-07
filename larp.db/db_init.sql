-- create database

DROP DATABASE larp_test;
CREATE DATABASE larp_test WITH OWNER = postgres ENCODING = 'UTF8'
TABLESPACE=larp;
ALTER DATABASE larp_test SET search_path="$user", public, sde;
GRANT ALL ON DATABASE larp_test TO public;
GRANT ALL ON DATABASE larp_test TO postgres;

-- create uuid extension

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

-- create character resources table

CREATE TABLE larp.character_resources (
    character_id uuid NOT NULL,
    resource_id uuid NOT NULL,
    value integer NOT NULL
);
ALTER TABLE larp.character_resources OWNER TO postgres;

-- create character table

CREATE TABLE larp.characters (
    id uuid DEFAULT larp.uuid_generate_v4() NOT NULL,
    name character varying(45) NOT NULL,
    user_id uuid NOT NULL
);
ALTER TABLE larp.characters OWNER TO postgres;

-- create resources table

CREATE TABLE larp.resources (
    id uuid DEFAULT larp.uuid_generate_v4() NOT NULL,
    name character varying(45) NOT NULL,
    description text NOT NULL,
    min integer NOT NULL,
    max integer NOT NULL,
    step integer NOT NULL
);
ALTER TABLE larp.resources OWNER TO postgres;

-- create users table

CREATE TABLE larp.users (
    id uuid DEFAULT larp.uuid_generate_v4() NOT NULL,
    login character varying(12) NOT NULL,
    name character varying(20) NOT NULL,
    surname character varying(20) NOT NULL,
    roles character varying(45) DEFAULT ''::character varying,
    password character varying(100) NOT NULL,
    salt character varying(10) NOT NULL
);
ALTER TABLE larp.users OWNER TO postgres;

-- create users info view

CREATE VIEW larp.users_info AS
 SELECT users.id,
    users.login,
    users.name,
    users.surname,
    users.password,
    users.roles,
    ( SELECT array_to_json(array_agg(row_to_json("character".*))) AS array_to_json
           FROM ( SELECT character_1.id,
                    character_1.name
                   FROM larp.characters character_1
                  WHERE (character_1.user_id = users.id)) "character") AS characters
   FROM larp.users users;
ALTER TABLE larp.users_info OWNER TO postgres;

-- create constraints for tables

ALTER TABLE ONLY larp.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);

ALTER TABLE ONLY larp.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);

ALTER TABLE ONLY larp.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY larp.character_resources
    ADD CONSTRAINT fk_character FOREIGN KEY (character_id) REFERENCES larp.characters(id) ON DELETE CASCADE;

ALTER TABLE ONLY larp.character_resources
    ADD CONSTRAINT fk_resource FOREIGN KEY (resource_id) REFERENCES larp.resources(id) ON DELETE CASCADE;

ALTER TABLE ONLY larp.characters
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES larp.users(id) ON DELETE CASCADE;

-- Data examples