DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS userinfo;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  enabled TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS  authorities (
  username VARCHAR(50) NOT NULL,
  authority VARCHAR(50) NOT NULL,
  FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS userinfo (
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS estimation (
    email VARCHAR(50) NOT NULL,
    packagetype VARCHAR(50) NOT NULL,
    companysize INTEGER NOT NULL,
    alwayssupport BOOLEAN NOT NULL,
    dataencryption BOOLEAN NOT NULL,
    databackup BOOLEAN NOT NULL,
    quotedprice INTEGER NOT NULL
);
-- CREATE UNIQUE  INDEX ix_auth_username on authorities (username,authority);