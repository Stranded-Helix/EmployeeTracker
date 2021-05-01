const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

const start = () => {
    
}

const mainMenu = () => {
    inquirer.prompt({
        type: `choices`,
        message: `What would you like to do?`,
        choices: [
            `View All Employees By Department`,
            `View All Employees By Manager`,
            `Add Employee`,
            `Remove Employee`,
            `Update Employee Role`,
            `Update Employee Manager`,
            `View All Roles`
        ],
        name: `mainMenuChoice`
    })
    .then(response => {
        switch(response) {
            case `View All Employees By Department`:
                employeesByDepartment();
                break;
            case `View All Employees By Manager`:
                employeesByManager();
                break;
            case `Add Employee`:
                employeesAdd();
                break;
            case `Remove Employee`:
                employeesRemove();
                break;
            case `Update Employee Role`:
                employeesUpdateRole()
                break;
            case `Update Employee Manager`:
                employeesUpdateManager();
                break;
            case `View All Roles`:
                rolesView();
                break;

        }
    })
    
}

const employeesByDepartment = () => {
    inquirer.prompt(
        {
            type: `choices`,
            message: `Which department would you like to view`,
            choices: [], //FUNCTION: READ DEPARTMENT,
            name: `departementChoice`
        }
    )
    .then(response => {
        //SELECT STATMENT response.name
    })
}

const employeesByManager = () => {
    
}

const employeesAdd = () => {
    
}

const employeesRemove = () => {
    
}

const employeesUpdateRole = () => {
    
}

const employeesUpdateManager = () => {
    
}

const rolesView = () => {
    
}