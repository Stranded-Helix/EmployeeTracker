const mysql = require(`mysql`);

var connection;

const connectDatabase = () => {
    return new Promise((resolve, reject) => {
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
    })
};

const selectDepartments = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT department_name 
        FROM department`,
            (err, res) => {
                if (err) reject(`Failed selectDepartment`);
                resolve(res.map(x => x.department_name));
            });
    });
}

const selectEmployeesByDepartment = (department) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT employees.first_name, employees.last_name, employee_role.title
        FROM employees
        JOIN employee_role
        ON employees.role_id = employee_role.id
        JOIN department ON employee_role.department_id = department.id
        WHERE ?`,
            [
                {
                    department_name: department
                }
            ],
            (err, res) => {
                if (err) reject(console.log(`Failed selectEmployeesByDepartment`));
                resolve(console.table(res))
            })
    })
}

const selectManagers = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT managers.id, managers.first_name, managers.last_name, employee_role.title
        FROM employees managers
        JOIN employee_role
        ON managers.role_id = employee_role.id
        JOIN employees
        ON managers.id = employees.manager_id
        GROUP BY managers.id`,
            (err, res) => {
                if (err) reject(console.log(`Failed selectManagers`));
                resolve(res.map(x => ({name: `${x.first_name} ${x.last_name}: ${x.title}`, value: x.id}))
                )
            })
    })
}

const selectEmployeesByManager = (manager) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT employees.first_name, employees.last_name, employee_role.title
        FROM employees
        JOIN employee_role
        ON employees.role_id = employee_role.id
        WHERE ?`,
            [
                {
                    manager_id: manager
                }
            ],
            (err, res) => {
                if (err) reject(console.log(`Failed selectEmployeesByManager`));
                resolve(console.table(res))
            });
    })
}

const selectRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT id, title 
        FROM employee_role`,
            (err, res) => {
                if (err) reject(`Failed selectRoles`);
                resolve(res.map(x => ({name: x.title, value: x.id})));
            });
    });
}

const selectEmployee = () => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT id, first_name, last_name 
        FROM employees`,
            (err, res) => {
                if (err) reject(`Failed selectEmployee`);
                resolve(res.map(x => ({name: `${x.first_name} ${x.last_name}`, value: x.id})));
            });
    });
}

const insertEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO employees SET ?`,
            [
                {
                    first_name: employee.firstName,
                    last_name: employee.lastName,
                    role_id: employee.role,
                    manager_id: employee.manager
                }
            ],
            (err, res) => {
                if (err) reject(console.log(`Failed insertEmployee`));
                resolve(res)
            });
    })
}

const deleteEmployee = (employeeId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM employees WHERE ?`,
            [
                {
                    id: employeeId
                }
            ],
            (err, res) => {
                if (err) reject(console.log(`Failed deleteEmployee`));
                resolve(res)
            });
    })
}
module.exports = {
    connectDatabase,
    selectDepartments,
    selectEmployeesByDepartment,
    selectManagers,
    selectEmployeesByManager,
    selectRoles,
    insertEmployee,
    selectEmployee,
    deleteEmployee

}