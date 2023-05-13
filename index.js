const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');


function start () {
inquirer
.prompt(
  {
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
  },
)
.then((selected) => {
    const { main } = selected;
    if (main == "View All Employees") {
        viewEmployees(); 
    } else if (main == "Add Employee") {
        addEmployee();
    } else if (main == "Update Employee Role") {
        updateRole();
    } else if (main == "View All Roles") {
        viewRoles();
    } else if (main == "Add Role") {
        addRole();
    } else if (main == "View All Departments") {
        viewDept();
    } else if (main == "Add Department") 
        addDept();
});
};


function viewEmployees() {
    db.query('SELECT * FROM employee', function (error, results) {
        if(error) {
            console.log(error);
            // throw error;
        }
        //console.log(results);
        console.table(results);
        start();
      });
};

function addEmployee() {

    db.query("SELECT * FROM roles;", function(error, data) {
        if(error) {
            console.log(error)
        }

       // console.log(data);
       // console.table(data);
      //  let dataARR = data[]
        let results = data.map(( {id, name }) => ({
            name: name,
            value: id
        }));
    
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of your Employee?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the last name of your Employee?"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the Role for this Employee?",
                choices: results
            },
            {
                type: "list",
                name: "managerId",
                message: "Who is the Manager for this Employee?",
                choices: results
            }
        ]).then(data => {
            console.log(data);
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [data.firstName, data.lastName, data.roleId, data.managerId], function(error, data) {
            start()
        })


    } )


    
})
};

function updateRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "updatedEmployeeRole",  
            message: "What employee id do you want to update?"
        },
        {
            type: "input",
            name: "employeeRole",
            message: "What is their new role id?"
        }
    ]).then((response) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?;', [response.employeeRole, response.updatedEmployeeRole], function(error, data) {
        if(error) throw error;
        start()
    })
    })

    

};

function viewRoles() {
    db.query('SELECT * FROM roles', function (error, results) {
        if(error) {
            console.log(error);
            // throw error;
        }
        //console.log(results);
        console.table(results);
        start();
      }
    )};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role you want to add?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this role?"
        },
        {
            type: "input",
            name: "roleDept",
            message: "What is the department id for this role?"
        }
    ]).then((response) => {
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', [response.roleName, response.roleSalary, response.roleDept], function(error, data) {
            if(error) throw error;
            start()
        })
    })

};

function viewDept() {
    db.query('SELECT * FROM department', function (error, results) {
        if(error) {
            console.log(error);
            // throw error;
        }
        //console.log(results);
        console.table(results);
        start();
      }
    )

};

function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the department you want to add?"
        }
    ]).then((response) => {
        db.query('INSERT INTO department (dept_name) VALUES (?);', [response.deptName], function(error, data) {
            if(error) throw error;
            start()
        })
    })

};

start();