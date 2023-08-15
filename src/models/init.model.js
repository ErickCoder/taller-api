 const Repair = require('./repairs.model');
const User = require('./users.model');

const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'userid' });
  Repair.belongsTo(User, { foreignKey: 'userid' });
};

module.exports=initModel;