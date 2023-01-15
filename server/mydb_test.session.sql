-- @block
INSERT INTO Users (email, bio, country)
VALUES (
    'ddddhdddellodddd@wodddddrld.com',
    'i love u',
    'us'
);


-- @block
SELECT * FROM Users
WHERE email LIKE 'h%'

ORDER BY id DESC
LIMIT 2;


-- @block
CREATE TABLE Rooms(
    id INT AUTO_INCREMENT,
    street VARCHAR(255),
    owner_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES Users(id)
); 


-- @block
INSERT INTO Rooms (owner_id, street)
VALUES
    (1, 'a'),
    (1, 'b'),
    (1, 'c'),
    (1, 'd');


-- @block
SELECT * FROM Users
RIGHT JOIN Rooms
ON Rooms.owner_id = Users.id;


-- @block
CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- @block
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
