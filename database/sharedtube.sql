\c postgres;
DROP DATABASE sharedtube;
CREATE DATABASE sharedtube;
\c sharedtube;

CREATE TABLE USERS (
	id_user		SERIAL PRIMARY KEY,
	email		VARCHAR(64) UNIQUE,
	password	VARCHAR(1024) ,
	username	VARCHAR(64) UNIQUE
);

CREATE TABLE FRIENDS (
	id_user  SERIAL NOT NULL references USERS(id_user),
	id_friend SERIAL NOT NULL references USERS(id_user),
	approved  BOOLEAN DEFAULT FALSE
);


CREATE TABLE PLAYLIST (
		id_playlist SERIAL NOT NULL PRIMARY KEY,
	name	VARCHAR(256) NOT NULL UNIQUE

);

CREATE TABLE VIDEOS (
		id_video SERIAL PRIMARY KEY,
	name	VARCHAR(256) NOT NULL,
		URL	VARCHAR(1024) NOT NULL UNIQUE,
	thumbnail VARCHAR(1024) NOT NULL
);

CREATE TABLE USERS_PLAYLIST (
		id_user SERIAL NOT NULL references USERS(id_user),
	id_playlist SERIAL NOT NULL references PLAYLIST(id_playlist)

);

CREATE TABLE VIDEO_PLAYLIST (
		id_video SERIAL NOT NULL references VIDEOS(id_video),
	id_playlist SERIAL NOT NULL references PLAYLIST(id_playlist)
);
