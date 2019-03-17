CREATE TABLE IF NOT EXISTS APP_USER (
    id SERIAL PRIMARY KEY,
    userid TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    create_time TIMESTAMP WITHOUT TIME ZONE,
    authority TEXT NOT NULL
);
ALTER TABLE app_user alter column create_time set default current_timestamp;