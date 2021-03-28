-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a table to store clubs in.
CREATE TABLE IF NOT EXISTS clubs (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	clubImage VARCHAR(255),
	CONSTRAINT nameUnique UNIQUE (name)
);

-- Create a table to store post in.
CREATE TABLE IF NOT EXISTS posts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	content TEXT NOT NULL,
	club VARCHAR(50) NOT NULL,
	userOfPost VARCHAR(50) NOT NULL,
	dateCreated DATE NOT NULL,
	FOREIGN KEY (club) REFERENCES clubs(name),
	FOREIGN KEY (userOfPost) REFERENCES accounts(username),
	CONSTRAINT titleUnique UNIQUE (title)
);




-- admin details(username: admin, password: admin123)
INSERT INTO accounts (username, password) VALUES ("admin", "$2b$10$28pWD0GCxURIdck3UVHFZ.9iNHJy1fjQoH0TlrJJ5GOKYARstrTc6");
INSERT INTO clubs (name, clubImage) VALUES ("Milan", "83561628-9a5b-4403-b803-ab913d3e1d0cMilan.svg.png");
INSERT INTO clubs (name, clubImage) VALUES ("Chelsea", "9aed450a-6031-4474-b4a2-050842c4b62f1582130722485.png");
INSERT INTO clubs (name, clubImage) VALUES ("Manchester City", "d993ece6-34cd-44ff-91fc-06d549d8a318.png");
INSERT INTO posts (title, content, club, dateCreated, userOfPost) VALUES ("milan test", "milan content", "Milan", "2021-01-01", "admin");
INSERT INTO posts (title, content, club, dateCreated, userOfPost) VALUES ("milan test 2", "milan content", "Milan", "2021-03-27", "admin");
INSERT INTO posts (title, content, club, dateCreated, userOfPost) VALUES ("che test", "ch content", "Manchester City", "2021-08-06", "admin");
