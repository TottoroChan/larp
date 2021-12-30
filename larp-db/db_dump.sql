--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

-- Started on 2021-11-28 21:00:43

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
-- TOC entry 3029 (class 0 OID 0)
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
-- TOC entry 205 (class 1259 OID 24576)
-- Name: users_info; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.users_info AS
 SELECT users.id AS userid,
    users.login,
    users.name AS username,
    users.surname,
    users.password,
    users.roles,
    characters.id AS characterid,
    characters.name AS charactername
   FROM (public.users users
     FULL JOIN public.characters characters ON ((users.id = characters.user_id)));


ALTER TABLE public.users_info OWNER TO postgres;

--
-- TOC entry 3023 (class 0 OID 16446)
-- Dependencies: 204
-- Data for Name: character_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.character_resources (character_id, resource_id, value) FROM stdin;
a896820b-af15-45ea-b0cd-88d18f7927a5	bbcf967c-3954-48ef-9827-520410750e85	20
a86e3f59-23c2-454c-b28e-0ad7cc4498bb	0ab46f7b-491a-41e1-9bdb-9c4bbe62f258	10
\.


--
-- TOC entry 3022 (class 0 OID 16435)
-- Dependencies: 203
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.characters (id, name, user_id) FROM stdin;
a896820b-af15-45ea-b0cd-88d18f7927a5	first character	ca3b4ca2-4ced-4b8b-8719-daa49ebd262f
a86e3f59-23c2-454c-b28e-0ad7cc4498bb	second character	665a5e9f-f502-448d-8790-6139a363da7b
3405c6de-04b7-4187-864e-807a32c258da	new character	ca3b4ca2-4ced-4b8b-8719-daa49ebd262f
\.


--
-- TOC entry 3021 (class 0 OID 16426)
-- Dependencies: 202
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resources (id, name, description, min, max, step) FROM stdin;
bbcf967c-3954-48ef-9827-520410750e85	first	first resource from 0 to 50 with step 2	0	50	2
0ab46f7b-491a-41e1-9bdb-9c4bbe62f258	second	second  resource from 0 to 50 with step 5	0	50	5
\.


--
-- TOC entry 3020 (class 0 OID 16419)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, login, name, surname, roles, password, salt) FROM stdin;
ca3b4ca2-4ced-4b8b-8719-daa49ebd262f	firstUser	first	user		aaaaaaa	bb
665a5e9f-f502-448d-8790-6139a363da7b	secondUser	second	user		aaaaaaa	bb
20ed07ec-dd0d-45cb-8644-8db912d13a28	thirdUser	third	user		aaaaaaa	bb
b22ab8f9-f8ba-4b52-9284-ccca218413a5	testUser	test1	tests		passqq	aaaa
c1ecb805-b194-4b9a-a2a6-566f94872a02	testUser	test1	tests		passqq	aaaa
a3a6e56b-d593-43ab-b8f5-0ee3fc456f01	sffsf	sfsfsfsdf	sdfsfsfdsf		sfdsfsfsdf	aaaa
1548a3e2-4f28-413c-a196-cba30977558b	sffsf111	sfsfsfsdf	sdfsfsfdsf		sfdsfsfsdf	aaaa
e429ed79-e449-4d0e-a410-c716cad1013c	sdad11	asdsad12	adad	\N	dadsa	aaaa
\.


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


-- Completed on 2021-11-28 21:00:44

--
-- PostgreSQL database dump complete
--

