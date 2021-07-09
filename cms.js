const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
const database = require(`./database.js`);

const start = () => {
    database.connectDatabase()
    .then(() => mainMenu())

}

const mainMenu = () => {
    inquirer.prompt({
        type: `list`,
        message: `What would you like to do?`,
        choices: [
            `View All Employees`,
            `View All Employees By Department`,
            `View All Employees By Manager`,
            `View Departments`,
            `View Roles`,
            `Add Employee`,
            `Add Department`,
            `Add Role`,
            `Remove Employee`,
            `Update Employee Role`,
            `Update Employee Manager`,
        ],
        name: `mainMenuChoice`
    })
    .then(response => {
        switch(response.mainMenuChoice) {
            case `View All Employees`:
                employeesAll();
                break;
            case `View All Employees By Department`:
                employeesByDepartment();
                break;
            case `View All Employees By Manager`:
                employeesByManager();
                break;
            case `View Departments`:
                departmentsAll();
                break;
            case `View Roles`:
                rolesAll();
                break;
            case `Add Employee`:
                employeesAdd();
                break;
            case `Add Department`:
                departmentAdd();
                break;
            case `Add Role`:
                roleAdd();
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
        }
    })
    
}

const employeesAll = () => {
    database.selectEmployee()
    .then(selectEmployeeResults => console.table(selectEmployeeResults.map(x => x.name)))
    .then(() => mainMenu())
}
const departmentsAll = () => {
    database.selectDepartments()
    .then(selectDepartmentResults => console.table(selectDepartmentResults))
    .then(() => mainMenu())
}
const rolesAll = () => {
    database.selectRoles()
    .then(selectRolesResults => console.table(selectRolesResults.map(x => x.name)))
    .then(() => mainMenu())
}
const employeesByDepartment = () => {
    database.selectDepartments()
    .then(selectDepartmentsResults => {
        inquirer.prompt(
            {
                type: `list`,
                message: `Which department would you like to view`,
                choices: selectDepartmentsResults,
                name: `departementChoice`
            }
        )
        .then(departmentChoiceResults => {
            database.selectEmployeesByDepartment(departmentChoiceResults.departementChoice)
            .then(()=> mainMenu());
        })
    })
}
const employeesByManager = () => {
    database.selectManagers()
    .then(selectManagersResults => {
        inquirer.prompt(
            {
                type: `list`,
                message: `Whose team would you like to view`,
                choices:  selectManagersResults,
                name: `managerChoice`
            }
        )
        .then(managerChoiceResults => {
            database.selectEmployeesByManager(managerChoiceResults.managerChoice)
            .then(()=> mainMenu());
        })
    })
}
const employeesAdd = () => {
    Promise.all([database.selectRoles(), database.selectManagers()])
    .then((promiseResults) => {
        promiseResults[1].push({name: `No Manager`, value: -1})
    inquirer.prompt([
        {
            type: `input`,
            message: `First Name`,
            name: `firstName`
        },
        {
            type: `input`,
            message: `Last Name`,
            name: `lastName`
        },
        {
            type: `list`,
            message: `Assign Role`,
            choices: promiseResults[0],
            name: `role`
        },
        {
            type: `list`,
            message: `Assign Manager`,
            choices: promiseResults[1],
            name: `manager`
        },
        ]
        )
        .then((inqResults) => {
            if(inqResults.manager === -1) delete inqResults.manager
            database.insertEmployee(inqResults)
        })
        .then(() => mainMenu())
    })
}
const employeesRemove = () => {
    database.selectEmployee()
    .then(selectEmployeeResults => {
        console.log(selectEmployeeResults);
        inquirer.prompt({
            type: `list`,
            message: `Which employee are you removing`,
            choices: selectEmployeeResults,
            name: `employeeChoice`,
        })
        .then(employeeChoiceResults => {
            database.deleteEmployee(employeeChoiceResults.employeeChoice)
        })
        .then(() => mainMenu())
    })
}
const employeesUpdateRole = () => {
    Promise.all([database.selectRoles(), database.selectManagers(), database.selectEmployee()])
    .then((promiseResults) => {
        console.log(promiseResults);
        promiseResults[1].push({name: `No Manager`, value: -1})
    inquirer.prompt([
        {
            type: `list`,
            message: `Employee to Update`,
            choices: promiseResults[2],
            name: `employee`
        },
        {
            type: `list`,
            message: `New Role`,
            choices: promiseResults[0],
            name: `role`
        },
        {
            type: `list`,
            message: `Assign Manager`,
            choices: promiseResults[1],
            name: `manager`
        },
        ]
        )
        .then((inqResults) => {
            if(inqResults.manager === -1) delete inqResults.manager
            console.log(inqResults);
            database.updateEmployee(inqResults.employee, inqResults.role, inqResults.manager);
        })
        .then(() => mainMenu())
    })
}
const employeesUpdateManager = () => {
    
}

const roleAdd = () => {
    database.selectDepartments(1)
    .then((promiseResults) => {
    inquirer.prompt([
        {
            type: `input`,
            message: `Role Title`,
            name: `title`
        },
        {
            type: `input`,
            message: `Salary`,
            name: `salary`
        },
        {
            type: `list`,
            message: `Assign Department`,
            choices: promiseResults,
            name: `departmentId`
        }])
        .then((inqResults) => {
            inqResults.salary = parseInt(inqResults.salary);
            inqResults.departmentId = parseInt(inqResults.departmentId);
            database.insertRole(inqResults)
        })
        .then(() => mainMenu())
    })
}

const departmentAdd = () => {
    inquirer.prompt(
        {
            type: `input`,
            message: `Department Name`,
            name: `department`
        })
        .then((inqResults) => {
            database.insertDepartment(inqResults)
        })
        .then(() => mainMenu())
}



//Function Calls
start();