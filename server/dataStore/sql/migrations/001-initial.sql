CREATE TABLE users(
  id        VARCHAR PRIMARY KEY,
  firstName VARCHAR NOT NULL,
  lastName  VARCHAR NOT NULL,
  userName  VARCHAR NOT NULL UNIQUE,
  email     VARCHAR NOT NULL UNIQUE,
  password  VARCHAR NOT NULL
);

CREATE TABLE posts(
  id        VARCHAR PRIMARY KEY,
  title     VARCHAR NOT NULL,
  url   VARCHAR NOT NULL UNIQUE,
  userId  VARCHAR NOT NULL,
  postedAt INTEGER NOT NULL ,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- CREATE TABLE Comment(
--   id        VARCHAR PRIMARY KEY,
--   content   VARCHAR NOT NULL,
--   postId    VARCHAR NOT NULL,
--   userId    VARCHAR NOT NULL,
--   FOREIGN KEY (postId) REFERENCES posts(id),
--   FOREIGN KEY (userId) REFERENCES users(id)
-- )

-- CREATE TABLE Like(
--   id        VARCHAR PRIMARY KEY,
--   postId    VARCHAR NOT NULL,
--   userId    VARCHAR NOT NULL,
--   FOREIGN KEY (postId) REFERENCES posts(id),
--   FOREIGN KEY (userId) REFERENCES users(id)
-- )