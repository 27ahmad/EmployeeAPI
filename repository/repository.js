const Employee = require('../model/model');

const findAll = async () => {
  return await Employee.findAll();
};

const findById = async (id) => {
  return await Employee.findByPk(id);
};

const create = async (employeeData) => {
  return await Employee.create(employeeData);
};

const update = async (id, employeeData) => {
  const [updated] = await Employee.update(employeeData, {
    where: { id },
  });
  return updated ? await findById(id) : null;
};

const deleteEmployee = async (id) => {
  const deleted = await Employee.destroy({ where: { id } });
  return deleted > 0;
};

const findByEmail = async (email) => {
  return await Employee.findOne({ where: { email } }); // Corrected method
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteEmployee,
  findByEmail,
};
