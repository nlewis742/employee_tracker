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
.then((selected) => {
    const { main } = selected;
    if (main == "View All Employees") {
        viewEmployees(); 
    } else if (main == "Add Employee") {
        addEmployee();
    } else if (main == "Update Employee Role") {
        updateRole();
    }else if (main == "View All Roles") {
        viewRoles();
    } else if (main == "Add Role") {
        addRole();
    } else if (main == "View All Departments") {
        viewDept();
    } else if (main == "Add Department")
        addDept();
});



function viewEmployees() {

};

function addEmployee() {

};

function updateRole() {

};

function viewRoles() {

};

function addRole() {

};

function viewDept() {

};

function addDept() {

};