-- Create a table to store user accounts in.
CREATE TABLE IF NOT EXISTS accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	hashedPassword VARCHAR(255) NOT NULL,
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
	FOREIGN KEY (club) REFERENCES clubs(name),
	FOREIGN KEY (userOfPost) REFERENCES accounts(username),
	CONSTRAINT titleUnique UNIQUE (title)
);




-- Create a dummy account for testing.
INSERT INTO accounts (username, hashedpassword) VALUES ("Alice", "abc123");
INSERT INTO accounts (username, hashedpassword) VALUES ("hawkar", "abc123");
INSERT INTO accounts (username, hashedpassword) VALUES ("bob", "abc123");
-- admin details(username: admin, password: admin123)
INSERT INTO accounts (username, hashedPassword) VALUES ("admin", "$2b$10$28pWD0GCxURIdck3UVHFZ.9iNHJy1fjQoH0TlrJJ5GOKYARstrTc6");
-- regular user(username: test, password: test1234)
INSERT INTO accounts (username, hashedPassword) VALUES ("test", "$2b$10$zN1.ZS.0zP9o03IFkBdGVOOrkuD.TZF0lAi0LW2dbJlbNvi/i2S8q");
INSERT INTO posts (title, content, club, userOfPost) VALUES ("milan test", "milan content", "Milan", "hawkar");
INSERT INTO posts (title, content, club, userOfPost) VALUES ("milan test 2", "milan content", "Milan", "bob");
INSERT INTO posts (title, content, club, userOfPost) VALUES ("che test", "ch content", "Chelsea", "hawkar");
