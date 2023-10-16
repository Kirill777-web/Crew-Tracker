//Hide any sensitive data with the dotenv package
require('dotenv').config();
//Add the banner to the application
const figlet = require('figlet');

// Placeholder for chalk
let chalk;
// Define displayBanner outside the dynamic import's callback
const displayBanner = () => {
  if (!chalk) {
    console.log("Chalk hasn't been imported yet.");
    return;
  }
  //clear the console and display the banner
  console.clear();
  console.log(
    chalk.yellow(figlet.textSync('Crew-Tracker', { horizontalLayout: 'full' }))
  );
  //Display the welcome message
  console.log(
    chalk.green(
      '----------------------------------------------------------------\nWelcome to the CrewTracker Application! Press Enter to continue\n----------------------------------------------------------------'
    )
  );
};
// Use dynamic import for chalk
import('chalk').then((module) => {
  chalk = module.default;
  displayBanner(); // Call displayBanner within the callback
});

// Connection to the database
const mysql = require('mysql2');
// Load environment variables from .env file
require('dotenv').config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//inquiere modul to prompt the user with questions
const inquirer = require('inquirer');
//Main prompt function for the application
//It will present the user with a list of choices
const mainMenu = async () => {
  console.log('About to show the menu...');
  const { choice } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit',
    ],
  });
  //The switch statement checks the value of choice
  //and decides which function to call based on that value
  switch (choice) {
    case 'View all departments':
      return viewAllDepartments();
    case 'View all roles':
      return viewAllRoles();
    case 'View all employees':
      return viewAllEmployees();
    case 'Add a department':
      return addDepartment();
    case 'Add a role':
      return addRole();
    case 'Add an employee':
      return addEmployee();
    case 'Update an employee role':
      return updateEmployeeRole();
    default:
      return process.exit();
  }
};
//function to view all departments
const viewAllDepartments = async () => {
  // Query to view all departments
  const query = 'SELECT * FROM departments';
  // try catch block to handle errors
  try {
    const [departments] = await db.promise().query(query); //query the database and store the results in the departments variable
    if (departments.length === 0) {
      console.log('No departments found.');
    } else {
      console.table(departments);
    }
  } catch (err) {
    console.log(err);
  }
  mainMenu(); //return to the main menu
};

//function to view all roles
const viewAllRoles = async () => {
  // Query to view all roles
  const query = 'SELECT * FROM roles';
  // try catch block to handle errors
  try {
    const [roles] = await db.promise().query(query); //query the database and store the results in the roles variable
    if (roles.length === 0) {
      console.log('No roles found.');
    } else {
      console.table(roles);
    }
  } catch (err) {
    console.log(err);
  }
  mainMenu();
};

//function to view all employees
const viewAllEmployees = async () => {
  // Query to view all employees
  const query = `
SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.name as department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) as manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees m ON employees.manager_id = m.id
`; //query to join the tables and display the results
  // try catch block to handle errors
  try {
    const [employees] = await db.promise().query(query);
    if (employees.length === 0) {
      console.log('No employees are found.');
    } else {
      console.table(employees);
    }
  } catch (err) {
    console.log(err);
  }
  mainMenu();
};

//function to add a department
const addDepartment = async () => {
  //prompt the user to enter the name of the department
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  });
  const query = `INSERT INTO departments (name) VALUES (?)`; //query to insert the department into the database
  // try catch block to handle errors
  try {
    //query the database and insert the department
    await db.promise().query(query, [name]);
    console.log('Department added successfully.');
  } catch (err) {
    console.log(err);
  }
  mainMenu();
};

//Function to add a role to the database
const addRole = async () => {
  const { jobTitle, salary } = await inquirer.prompt([
    {
      type: 'input',
      name: 'jobTitle',
      message: 'Enter the name of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role:',
    },
  ]);
  // Fetch the department list or create a new one
  const [departments] = await db
    .promise()
    .query('SELECT id, name FROM departments');
  //map the departments to an array of choices
  const departmentChoices = departments.map((dept) => ({
    name: dept.name,
    value: dept.id,
  }));
  departmentChoices.push({ name: 'Add new department', value: 0 });

  //Prompt the user to choose a department
  const chosenDepartment = await inquirer.prompt({
    type: 'list',
    name: 'departmentId',
    message: 'Which department does the role belong to:',
    choices: departmentChoices,
  });
  //if the user chooses to add a new department
  let departmentId = chosenDepartment.departmentId;
  if (departmentId === 0) {
    //prompt the user to enter the name of the new department
    const { departmentName } = await inquirer.prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    });
    // Insert the new department into the database
    const [result] = await db
      .promise()
      .query('INSERT INTO departments (name) VALUES (?)', [departmentName]);
    departmentId = result.insertId;
  }
  //insert the new role into the database
  // try catch block to handle errors
  try {
    await db
      .promise()
      .query(
        'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)',
        [jobTitle, salary, departmentId]
      );
    console.log('Role added successfully.');
  } catch (err) {
    console.log(err);
  }
  mainMenu();
};
//function to add an employee to the database
const addEmployee = async () => {
  const { firstName, lastName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
    },
  ]);

  // Fetch roles from the database
  const [roles] = await db.promise().query('SELECT id, job_title FROM roles');
  const roleChoices = roles.map((role) => ({
    name: role.job_title,
    value: role.id,
  }));
  // Add a new role option
  roleChoices.push({ name: 'Add new role', value: 0 });

  // Prompt the user to choose a role
  const chosenRole = await inquirer.prompt({
    type: 'list',
    name: 'roleId',
    message: 'Choose a role for the employee:',
    choices: roleChoices,
  });

  let roleId = chosenRole.roleId;
  // If user chooses to add a new role
  if (roleId === 0) {
    // Prompt the user to enter the name and salary of the new role
    const { jobTitle, salary } = await inquirer.prompt([
      {
        type: 'input',
        name: 'jobTitle',
        message: 'Enter the name of the new role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
      },
    ]);

    // Fetch departments from the database
    const [departments] = await db
      .promise()
      .query('SELECT id, name FROM departments');
    //map the departments to an array of choices
    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    departmentChoices.push({ name: 'Add new department', value: 0 });

    // Prompt the user to choose a department
    const chosenDepartment = await inquirer.prompt({
      type: 'list',
      name: 'departmentId',
      message: 'Choose a department for the new role:',
      choices: departmentChoices,
    });

    let departmentId = chosenDepartment.departmentId;

    // If user chooses to add a new department
    if (departmentId === 0) {
      const { newDepartmentName } = await inquirer.prompt({
        type: 'input',
        name: 'newDepartmentName',
        message: 'Enter the name of the new department:',
      });
      // Insert the new department into the database
      const [result] = await db
        .promise()
        .query('INSERT INTO departments (name) VALUES (?)', [
          newDepartmentName,
        ]);
      departmentId = result.insertId;
    }
    //insert the new role into the database
    const [roleResult] = await db
      .promise()
      .query(
        'INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)',
        [jobTitle, salary, departmentId]
      );
    roleId = roleResult.insertId;
  }

  // Fetch employees from the database for manager selection
  const [employees] = await db
    .promise()
    .query(
      'SELECT id, CONCAT(first_name, " ", last_name) AS fullName FROM employees'
    );
  const employeeChoices = employees.map((emp) => ({
    name: emp.fullName,
    value: emp.id,
  }));
  employeeChoices.push({ name: 'Add new manager', value: 0 });

  // Prompt user to choose a manager
  let managerResponse = await inquirer.prompt({
    type: 'list',
    name: 'managerId',
    message: 'Choose a manager for the employee:',
    choices: employeeChoices,
  });
  let managerId = managerResponse.managerId;

  // If user chooses to add a new manager
  if (managerId === 0) {
    const { managerFirstName, managerLastName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'managerFirstName',
        message: 'Enter the first name of the new manager:',
      },
      {
        type: 'input',
        name: 'managerLastName',
        message: 'Enter the last name of the new manager:',
      },
    ]);
    // Insert the new manager into the database
    const [result] = await db
      .promise()
      .query(
        'INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)',
        [managerFirstName, managerLastName, roleId]
      );
    managerId = result.insertId;
  }

  // Insert the new employee
  // try catch block to handle errors
  try {
    await db
      .promise()
      .query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [firstName, lastName, roleId, managerId]
      );
    console.log('Employee added successfully.');
  } catch (err) {
    console.log(err);
  }

  mainMenu();
};

//allow the user to update an employee's role in the database
const updateEmployeeRole = async () => {
  // Fetch employees from the database for selection
  const [employees] = await db
    .promise()
    .query(
      'SELECT id, CONCAT(first_name, " ", last_name) AS fullName FROM employees'
    );
  //map the employees to an array of choices
  const employeeChoices = employees.map((emp) => ({
    name: emp.fullName,
    value: emp.id,
  }));

  // Prompt the user to choose an employee to update
  const { employeeId } = await inquirer.prompt({
    type: 'list',
    name: 'employeeId',
    message: 'Which employee do you want to update?',
    choices: employeeChoices,
  });

  // Fetch roles from the database for selection
  const [roles] = await db.promise().query('SELECT id, job_title FROM roles');
  const roleChoices = roles.map((role) => ({
    name: role.job_title,
    value: role.id,
  }));

  // Prompt the user to choose a new role for the selected employee
  const { roleId } = await inquirer.prompt({
    type: 'list',
    name: 'roleId',
    message: 'Choose a new role for the employee:',
    choices: roleChoices,
  });

  // Update the selected employee's role in the database
  // try catch block to handle errors
  try {
    await db
      .promise()
      .query('UPDATE employees SET role_id = ? WHERE id = ?', [
        roleId,
        employeeId,
      ]);
    console.log('Employee role updated successfully.');
  } catch (err) {
    console.log(err);
  }
  mainMenu();
};
//call the mainMenu function to start the application
mainMenu();
