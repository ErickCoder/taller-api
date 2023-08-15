const Repairs = require('../models/repairs.model');
const Users= require('../models/users.model')

exports.createRepair = async (req, res) => {
  try {
    const { date, userid, description, motorsNumbers } = req.body;
    const repair = await Repairs.create({
      date,
      userid,
      description,
      motorsNumbers
    });
    res.status(201).json({
      status: 'success',
      message: 'Repair has been created',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error',
      message: 'Something went very wrong',
    });
  }
};

exports.showMotos = async (req, res) => {
  try {
    const repairs = await Repairs.findAll({
      where: {
        status: 'pending',
      },
      include: [
        {
          model: Users,
          attributes: ['id', 'name', 'email', 'role', 'status']
        }
        
      ]
    });

    res.status(200).json({
      status: 'success',
      message: 'List of repairs',
      results: repairs.length,
      repairs,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Error',
      error,
    });
  }
};

exports.FindRepairsPendingByID = async (req, res) => {
  try {
    const { repairs } = req;
  
    res.status(200).json({
      message: `Repair with id:${repairs.id}`,
      repairs,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
      error
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        satus: 'error',
        message: `Repair with id: ${id} not found`,
      });
    }
    await repair.update({ status });
    res.status(200).json({
      status: 'Status has been updated',
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Error editing repair',
    });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const repair = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        satus: 'error',
        message: `Register cannot be deleted`,
      });
    }
    if (status === 'completed') {
      res.status(400).json({
        status: 'error',
        message: 'Register cannot be deleted',
      });
    }
    const userDelete = await repair.update({
      status: 'canceled',
    });
    res.status(200).json({
      status: 'Suscces',
      message: 'Repair has been canceled',
      userDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'ID invalid',
      error,
    });
  }
};
