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