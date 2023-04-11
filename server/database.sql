CREATE DATABASE spotify_database; 

--\c into todo_database 

CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    artists text[20],
    genres text[20],
    albums text[20],
    duration varchar,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    user_id varchar
);

CREATE TABLE tracks(
    tracks text[20],
    artists text[20],
    albums text[20],
    uris text[20],
    duration varchar,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    user_id varchar
);

CREATE TABLE genres(
    genres text[10],
    duration varchar,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    user_id varchar
);

CREATE TABLE recent_tracks(
    tracks text[],
    created_at timestamp NOT NULL DEFAULT now(),
    calendar_date varchar,
    user_id varchar
);

CREATE TABLE listening_history(
    calendar_date varchar,
    duration varchar,
    created_at timestamp NOT NULL DEFAULT now(),
    user_id varchar
);
