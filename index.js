const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');



inquirer
.prompt([
  {
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
  },

])
.then((answers) => {

});
