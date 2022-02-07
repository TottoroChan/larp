--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

-- Started on 2021-12-25 11:59:34

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16395)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 16446)
-- Name: character_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.character_resources (
    character_id uuid NOT NULL,
    resource_id uuid NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public.character_resources OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16435)
-- Name: characters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(45) NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.characters OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16426)
-- Name: resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resources (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(45) NOT NULL,
    description text NOT NULL,
    min integer NOT NULL,
    max integer NOT NULL,
    step integer NOT NULL
);


ALTER TABLE public.resources OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16419)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    login character varying(12) NOT NULL,
    name character varying(20) NOT NULL,
    surname character varying(20) NOT NULL,
    roles character varying(45) DEFAULT ''::character varying,
    password character varying(100) NOT NULL,
    salt character varying(10) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24580)
-- Name: users_info; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.users_info AS
 SELECT users.id,
    users.login,
    users.name,
    users.surname,
    users.password,
    users.roles,
    ( SELECT array_to_json(array_agg(row_to_json("character".*))) AS array_to_json
           FROM ( SELECT character_1.id,
                    character_1.name
                   FROM public.characters character_1
                  WHERE (character_1.user_id = users.id)) "character") AS characters
   FROM public.users users;


ALTER TABLE public.users_info OWNER TO postgres;

--
-- TOC entry 2885 (class 2606 OID 16440)
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- TOC entry 2883 (class 2606 OID 16434)
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- TOC entry 2881 (class 2606 OID 16425)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2887 (class 2606 OID 16449)
-- Name: character_resources fk_character; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.character_resources
    ADD CONSTRAINT fk_character FOREIGN KEY (character_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- TOC entry 2888 (class 2606 OID 16454)
-- Name: character_resources fk_resource; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.character_resources
    ADD CONSTRAINT fk_resource FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE CASCADE;


--
-- TOC entry 2886 (class 2606 OID 16441)
-- Name: characters fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2021-12-25 11:59:34

--
-- PostgreSQL database dump complete
--

