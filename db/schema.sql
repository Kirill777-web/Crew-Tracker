-- the database and tables for the crew_db
DROP DATABASE IF EXISTS crew_db;
CREATE DATABASE crew_db;
-- Use the crew_db
USE crew_db;

-- the departments table
CREATE TABLE departments (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(50) NOT NULL
);
-- the roles table
CREATE TABLE roles (
 id INT AUTO_INCREMENT PRIMARY KEY,
 job_title VARCHAR(50) NOT NULL,
 salary DECIMAL(10,2) NOT NULL,
 department_id INT NOT NULL,
 FOREIGN KEY (department_id) REFERENCES departments(id)
);
-- the employees table
CREATE TABLE employees (
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(50) NOT NULL,
 last_name VARCHAR(50) NOT NULL,
 role_id INT NOT NULL,
 manager_id INT,
 FOREIGN KEY (role_id) REFERENCES roles(id),
 FOREIGN KEY (manager_id) REFERENCES employees(id)
);

