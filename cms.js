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
            `Addd Employee`,
            `Remove Employee`,
            `Update Employee Role`,
            `Update Employee Manager`,
            `View All Roles`
        ],
        name: mainMenuChoice;
    })
    
}