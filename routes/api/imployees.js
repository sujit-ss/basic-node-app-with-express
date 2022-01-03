const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const employeeController = require("../../controller/employeeController");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployeeById);

module.exports = router;
