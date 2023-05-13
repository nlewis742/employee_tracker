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
                choices: [results]
            },
            {
                type: "list",
                name: "managerId",
                message: "Who is the Manager for this Employee?",
                choices: [results]
            }
        ]).then(data => {
            console.log(data);
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [data.firstName, data.lastName, data.roleId, data.managerId], function(error, data) {
            start()
        })


    } )


    
   // db.query('INSERT INTO employee SET ?;', tempEmployee, function(error, data) {
    // db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', ["Tom", "Jane", 2, 9], function(error, data) {
    /*    if(error) {
            console.log(error);
        }
        */
       // console.log("Data: ", data);
       // start()
  //  })
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

};

function addRole() {

};

function viewDept() {

};

function addDept() {

};

start();