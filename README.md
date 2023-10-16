[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Title

# **CrewTracker: An Employee Management System**

## **Description**

`CrewTracker` is a basic yet powerful Employee Management System (EMS) designed to streamline HR tasks, improve employee data organization, and offer insights into job roles and departmental structures.

## **Table of Contents**

- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Note](#note)
- [Links](#links)
- [Credits](#credits)
- [License](#license)

## **Features**

1. **View All Data**: View all departments, roles, and employees with a single command.
2. **Add New Entries**: Seamlessly add new departments, roles, and employees to the database.
3. **Dynamic Role Assignment**: Assign employees to roles, or even create new roles on the fly.
4. **Managerial Assignments**: Set up reporting hierarchies by assigning managers to employees.
5. **Update Employee Roles**: Adapt to organizational changes by updating an employee's role when required.
6. **Interactive UI**: User-friendly prompts guide users through all functionalities, ensuring ease of use.
7. **Data Integrity**: Built-in constraints ensure data consistency and reliability.

## **Usage**

- **Human Resources**: Simplify the onboarding process, manage employee roles, and maintain an organized directory of all employees.
- **Management**: Get a clear view of department structures, employee roles, and reporting hierarchies.
- **Finance**: Analyze salary distributions by department or role for budgeting and financial planning.

## **Installation**

1. **Prerequisites**: Ensure you have `Node.js` installed and `MySQL` set up on your machine.
2. Clone the repository `git clone`
3. Navigate to the repository directory `cd your cloned directoty`
4. Install required packages `npm install`, `npm i inquirer@8.2.4`
5. Set up your database using the provided schema file.
6. Run the application

## **Database Initialization**

After setting up the application and installing necessary dependencies, you'll need to populate the database with sample data for a complete demonstration of the app's functionalities.

### **Steps to Populate the Database:**

1. Make sure you are in the main directory of the application in your terminal or command prompt.
2. Use the following command (powershell) to feed the sample data into your database:

   ```bash
   Get-Content .\db\seed.sql | mysql -u <YOUR_MYSQL_USERNAME> -p crew_db
   ```

## **Note**

The project requires a `.env` file with specific variables.

1. Create an `.env` file in main directory of the app.
2. Write variables inside this file (DB_HOST, DB_USER, DB_PASS, DB_NAME).

### Sample Configuration of `.env` file

```env
DB_HOST=your_host_here
DB_USER=your_user_here
DB_PASS=your_password_here
DB_NAME=your_database_name_here
```

## **Links**

- This is the link of my [GitHub repository](https://github.com/Kirill777-web/Crew-Tracker)
- Link of Screenrecorder [Screencastify](https://drive.google.com/file/d/1wbaRhKfXLdtkFEv0JocJpDXHgCnTHzTh/view)
- The following screenshots show all departments ![Crew-Tracker](/assets/img/CrewTrackerViewAllDepartments.png)
- The following screenshots show all roles ![Crew-Tracker](/assets/img/CrewTrackerViewAllRoles.png)
- The following screenshots show all employees ![Crew-Tracker](/assets/img/CrewTrackerViewAllEmployees.png)

## **Credits**

- [Inquirer](https://www.npmjs.com/package/inquirer): For interactive command line prompts.
- [MySQL](https://www.mysql.com/): As the relational database backend.
- [Chalk](https://www.npmjs.com/package/chalk): For terminal string styling.
- [Figlet](https://www.npmjs.com/package/figlet): For ASCII art generation.

## License

Copyright (c) 2023 Kirill Lazutin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
