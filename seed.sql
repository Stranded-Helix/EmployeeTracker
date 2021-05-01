USE employee_tracker_db;

TRUNCATE TABLE department;
TRUNCATE TABLE employee_role;
TRUNCATE TABLE employees;

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
("Service Writer", 50000, (SELECT id FROM department WHERE department_name = "Service"));

INSERT INTO employees (first_name, last_name, role_id)
VALUES
("Emme", "Adamson", (SELECT id FROM employee_role WHERE title = "Office Manager")),
("Vinay", "Everett", (SELECT id FROM employee_role WHERE title = "Parts Manager")),
("Otis", "Amos", (SELECT id FROM employee_role WHERE title = "Service Manager"));

SET @OfficeManagerID = (SELECT id FROM employees WHERE role_id IN (SELECT id FROM employee_role WHERE title = "Office Manager"));
SET @PartsManagerID = (SELECT id FROM employees WHERE role_id IN (SELECT id FROM employee_role WHERE title = "Parts Manager"));
SET @ServiceManagerID = (SELECT id FROM employees WHERE role_id IN (SELECT id FROM employee_role WHERE title = "Service Manager"));

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Hugo", "Meza", (SELECT id FROM employee_role WHERE title = "Payroll Coordinator"), @OfficeManagerID),
("Zachariah", "Moran", (SELECT id FROM employee_role WHERE title = "Budget Coordinator"), @OfficeManagerID),
("Eshaan", "Wilson", (SELECT id FROM employee_role WHERE title = "Parts Associate"), @PartsManagerID),
("Eduard", "Todd", (SELECT id FROM employee_role WHERE title = "Parts Associate"), @PartsManagerID),
("Ianis", "Delgado", (SELECT id FROM employee_role WHERE title = "Warehouse Associate"), @PartsManagerID),
("Harvie", "Lopez", (SELECT id FROM employee_role WHERE title = "Technician"), @ServiceManagerID),
("Wesley", "Lam", (SELECT id FROM employee_role WHERE title = "Technician"), @ServiceManagerID),
("Hussain", "Pena", (SELECT id FROM employee_role WHERE title = "Technician"), @ServiceManagerID),
("Neriah", "Pitts", (SELECT id FROM employee_role WHERE title = "Technician"), @ServiceManagerID),
("Kavita", "Pearce", (SELECT id FROM employee_role WHERE title = "Technician"), @ServiceManagerID),
("Tyson", "Sheridan", (SELECT id FROM employee_role WHERE title = "Technician"), @ServiceManagerID),
("Dionne", "Hills", (SELECT id FROM employee_role WHERE title = "Service Writer"), @ServiceManagerID),
("Chad", "Duggan", (SELECT id FROM employee_role WHERE title = "Service Writer"), @ServiceManagerID);