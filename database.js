const mysql = require(`mysql`);

var connection; 

const connectDatabase = () => {
return new Promise ((resolve, reject) => {
    connection = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `SMUPassword`,
    database: `employee_tracker_db`
});
connection.connect((err) => {
    if (err) reject(`Failed to Connect to Database`);
    resolve(connection);
})
})};

const selectDepartments = () => { 
    return new Promise ((resolve, reject) => {
        connection.query(`SELECT department_name FROM department`, (err, res) => {
            if (err) reject(`Failed selectDepartment`);
            resolve(res.map(x => x.department_name));
        });
});
}

// const selectDepartments = new Promise ((resolve, reject) => {
//     connection.connect((err) => {
//         connection.query(`SELECT department_name FROM department`, (err, res) => {
//             if (err) reject(`Failed selectDepartment`);
//             resolve(res.map(x => x.department_name));
//         });
//     })
// });

const selectEmployeesByDepartment = (department) => {
    return new Promise((resolve, reject) => { 
        connection.query(`SELECT employees.first_name, employees.last_name, employee_role.title FROM employees JOIN employee_role ON employees.role_id = employee_role.id JOIN department ON employee_role.department_id = department.id WHERE department_name="${department}"`,
            // [
            //     {
            //         department_name: department
            //     }
            // ],
            (err, res) => {
                if (err) reject(console.log(`Failed sEBD:  ${queryString.sql}`));
                resolve(console.log(res))
            })
            if(err) throw err;
    })
}

module.exports = {
    connectDatabase,
    selectDepartments,
    selectEmployeesByDepartment
}