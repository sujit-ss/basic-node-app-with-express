const data = {
  employees: require("../data/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.status(200).json(data.employees);
};

const createNewEmployee = (req, res) => {
  if (!req.body.name || !req.body.gender) {
    res.status(206).send({ message: `Not sufficient data` });
  }
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    name: req.body.name,
    gender: req.body.gender,
  };
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: `Employee id is required` });
  }
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    res.status(206).send({ message: `Employee id ${req.body.id} not found` });
  }
  const updatedEmployees = data.employees.map((emp) => {
    if (emp.id === parseInt(req.body.id)) {
      emp.name = req.body.name ? req.body.name : emp.name;
      emp.gender = req.body.gender ? req.body.gender : emp.gender;
    }
    return emp;
  });
  data.setEmployees(updatedEmployees);
  res.status(200).json(data.employees);
};

const deleteEmployee = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: `Employee id is required` });
  }
  const filteredData = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
  data.setEmployees(filteredData);
  res.status(200).json(data.employees);
};

const getEmployeeById = (req, res) => {
  res.status(200).json(data.employees.filter((emp) => emp.id === parseInt(req.params.id)));
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
