--test DB creation
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS character_resources;

--users creation
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 (),
    login VARCHAR(12) NOT NULL,
    name VARCHAR(20) NOT NULL,
    surname VARCHAR(20) NOT NULL,
    roles VARCHAR(45) DEFAULT '',
    PASSWORD VARCHAR(100) NOT NULL,
    salt VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

--resourses creation
CREATE TABLE resources (
    id UUID DEFAULT uuid_generate_v4 (),
    name VARCHAR(45) NOT NULL,
    description TEXT NOT NULL,
    min INTEGER NOT NULL,
    max INTEGER NOT NULL,
    step INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE characters (
    id UUID DEFAULT uuid_generate_v4 (),
    name VARCHAR(45) NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
            REFERENCES public.users(id)
            ON DELETE CASCADE
);

CREATE TABLE character_resources (
    character_id UUID NOT NULL,
    resource_id UUID NOT NULL,
    value INTEGER NOT NULL,
    CONSTRAINT fk_character
        FOREIGN KEY(character_id) 
            REFERENCES public.characters(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_resource
        FOREIGN KEY(resource_id) 
            REFERENCES public.resources(id)
            ON DELETE CASCADE
);

--inserts
INSERT INTO
    public.users(id, login, name, surname, roles, password, salt )
VALUES
    (DEFAULT, 'firstUser', 'first', 'user', DEFAULT, 'aaaaaaa', 'bb'),
    (DEFAULT, 'secondUser', 'second', 'user', DEFAULT, 'aaaaaaa', 'bb'),
    (DEFAULT, 'thirdUser', 'third', 'user', DEFAULT, 'aaaaaaa', 'bb');

INSERT INTO
    public.resources(id, name, description, min, max, step)
VALUES
    (DEFAULT, 'first', 'first resource from 0 to 50 with step 2', 0, 50, 2),
    (DEFAULT, 'second', 'second  resource from 0 to 50 with step 5', '0', 50, 5);

INSERT INTO
    public.characters(id, name, user_id)
VALUES
    (DEFAULT, 'first character', (SELECT id from public.users WHERE login='firstUser')),
    (DEFAULT, 'second character', (SELECT id from public.users WHERE login='secondUser'));

INSERT INTO
    public.character_resources(character_id, resource_id, value)
VALUES
    ((SELECT id from public.characters WHERE name='first character'), (SELECT id from public.resources WHERE name='first'), 20),
    ((SELECT id from public.characters WHERE name='second character'), (SELECT id from public.resources WHERE name='second'), 10);