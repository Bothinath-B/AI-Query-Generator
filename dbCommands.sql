create database aiQuery;
use aiQuery;
CREATE TABLE Customer (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    balance DECIMAL(10,2)
);
INSERT INTO Customer (name, email, phone, address, balance)
VALUES
('Alice', 'alice@example.com', '1234567890', '123 Main St', 2000.50),
('Bob', 'bob@example.com', '0987654321', '456 Elm St', 1500.00);
SELECT * FROM customer; 
show tables;
drop table if exists products;
SELECT * FROM products; 