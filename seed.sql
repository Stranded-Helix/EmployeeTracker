USE employee_tracker_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS employees;

INSERT INTO department (department_name)
VALUES
("Accounting"),
("Parts"),
("Service"),
("Sales");

INSERT INTO employee_role (title, salary, department_id)
VALUES
("Office Manager", 100000, (SELECT id FROM department WHERE department_name = "Accounting")),
("Payroll Coordinator", 40000, (SELECT id FROM department WHERE department_name = "Accounting")),
("Budget Coordinator", 60000, (SELECT id FROM department WHERE department_name = "Accounting")),
("Parts Manager", 120000, (SELECT id FROM department WHERE department_name = "Parts")),
("Parts Associate", 50000, (SELECT id FROM department WHERE department_name = "Parts")),
("Warehouse Associate", 35000, (SELECT id FROM department WHERE department_name = "Parts")),
("Service Manager", 120000, (SELECT id FROM department WHERE department_name = "Service")),
("Technician", 100000, (SELECT id FROM department WHERE department_name = "Service")),
("Service Writer", 50000, (SELECT id FROM department WHERE department_name = "Service")),
("Sales Manager", 140000, (SELECT id FROM department WHERE department_name = "Sales")),
("Sales Associate", 50000, (SELECT id FROM department WHERE department_name = "Sales"));

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Emme", "Adamson", (SELECT id FROM employee_role WHERE title = "Office Manager"))