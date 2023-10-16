-- Populating departments
INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('HR');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Marketing');

-- Populating roles
INSERT INTO roles (job_title, salary, department_id) VALUES ('Sales Executive', 70000.00, 1);
INSERT INTO roles (job_title, salary, department_id) VALUES ('Software Engineer', 80000.00, 2);
INSERT INTO roles (job_title, salary, department_id) VALUES ('HR Manager', 60000.00, 3);
INSERT INTO roles (job_title, salary, department_id) VALUES ('Financial Analyst', 75000.00, 4);
INSERT INTO roles (job_title, salary, department_id) VALUES ('Marketing Specialist', 72000.00, 5);

-- Populating employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Smith', 2, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Johnson', 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Eve', 'Brown', 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Jones', 5, 2);
