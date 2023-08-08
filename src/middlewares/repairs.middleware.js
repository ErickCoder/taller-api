const Repairs = require('../models/repairs.model');

exports.validRepairs = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repairs = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repairs) {
      return res.status(404).json({
        status: 'Error',
        message: `Repair with id: ${id} not found`,
      });
    }

    req.repairs = repairs;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
      error
    });
  }

  /*   try {
    const { id } = req.params;

    const repairs = await Repairs.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repairs) {
      return res.status(404).json({
        status: 'error',
        message: `Reapir with id: ${id} not found`,
      });
    }
    req.repairs = repairs;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error validate repair',
    });
  } */
};
