-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT usernameUnique UNIQUE (username)
);

-- Create a table to store clubs in.
CREATE TABLE clubs (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	CONSTRAINT nameUnique UNIQUE (name)
);

-- Create a table to store blogpost in.
CREATE TABLE blogposts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	content TEXT NOT NULL,
	club VARCHAR(50) NOT NULL,
	FOREIGN KEY (club) REFERENCES clubs(name),
	CONSTRAINT titleUnique UNIQUE (title)
);




-- Create a dummy account for testing.
INSERT INTO accounts (username, password) VALUES ("Alice", "abc123");
INSERT INTO clubs (name) VALUES ("Milan");
INSERT INTO clubs (name) VALUES ("City");
INSERT INTO clubs (name) VALUES ("UTD");
INSERT INTO blogposts (title, content, club) VALUES ("milan is best", "here is why", "Milan");
INSERT INTO blogposts (title, content, club) VALUES ("city is best", "here is why", "City");
INSERT INTO blogposts (title, content, club) VALUES ("utd is best", "here is why", "UTD");
INSERT INTO blogposts (title, content, club) VALUES ("milan is not best", "here is why", "Milan");
INSERT INTO blogposts (title, content, club) VALUES ("city is not best", "here is why", "City");
INSERT INTO blogposts (title, content, club) VALUES ("utd is not best", "here is why", "UTD");
