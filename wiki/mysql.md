# MySQL

## References
- https://dev.mysql.com/doc/refman/8.0/en/

## Create schema
```
CREATE TABLE Users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(2) NOT NULL,
  bio TEXT
);

CREATE INDEX email_index ON Users(email);

CREATE TABLE Rooms(
  id INT AUTO_INCREMENT,
  uid INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (uid) REFERENCES User(id)
);

DROP TABLE Users;
DROP DATABASE AirBnb;
```

## Add, update, delete data
``` 
INSERT INTO Users(email, country, bio)
VALUES ('joe@acme.org', 'us', 'Joe is a plummer'), 
       ('bob@acme.org', 'us', 'Bob is a contractor');

UPDATE Users 
SET bio = 'Joe is a manager'
WHERE id = 1;

DELETE FROM Users 
WHERE id = 1;
```

## Query data
```
SELECT email, bio
FROM Users
WHERE country = 'us' AND email LIKE '@acme.org'
ORDER BY email ASC
LIMIT 2
OFFSET 1

SELECT *
FROM Users
WHERE country IN (SELECT DISTINCT code FROM Countries WHERE...);
```

## Joins
- `a LEFT JOIN b` returns all `a` records, and matched `b` records
- `a RIGHT JOIN b` returns all `b` records, and matched `a` records
- `a INNER JOIN b` returns only matching `a` and `b` records
- `a OUTER JOIN b` returns all `a` and `b` records

```
SELECT * 
FROM Users 
  JOIN Rooms ON Rooms.uid = Users.id;

SELECT * 
FROM a 
  JOIN b ON a.x = b.y
  JOIN c ON b.y = c.z;

SELECT * 
FROM a 
  JOIN (SELECT * FROM b WHERE...) as t ON a.x = t.y;
```
