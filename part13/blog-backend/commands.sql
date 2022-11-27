CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES ('Dan Abramov', 'www.url.org', 'On let vs const'),
       ('Laurenz Albe', 'www.url.net', 'Gaps in sequences in PostgreSQL');
