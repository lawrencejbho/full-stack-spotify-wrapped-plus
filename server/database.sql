CREATE DATABASE spotify_database; 

--\c into todo_database 

CREATE TABLE artists(
    id SERIAL PRIMARY KEY,
    artists text[20],
    genres text[20],
    duration varchar,
    created_at date NOT NULL DEFAULT CURRENT_DATE,
    user_id varchar
);


CREATE TABLE genres(
    genres text[10],
    duration varchar,
    created_at timestamp NOT NULL DEFAULT now(),
    user_id varchar
);

CREATE TABLE recent_tracks(
    tracks text[],
    created_at timestamp NOT NULL DEFAULT now(),
    user_id varchar
);

CREATE TABLE listening_history(
    duration varchar,
    date_string varchar,
    created_at timestamp NOT NULL DEFAULT now(),
    user_id varchar
);




-- CREATE Table users(
--   id int [pk, increment] // auto-increment
--   created_at timestamp
-- );



-- CREATE Table tracks {
--   id int
--   country_code int
--   merchant_name varchar
  
--   created_at timestamp
--   user_id int [ref: > U.id]
-- }