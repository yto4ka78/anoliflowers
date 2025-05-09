module.exports = (sequelize, DataTypes) => {
  const RegistrationLog = sequelize.define("RegistrationLog", {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // только дата (без времени)
      allowNull: false,
    },
  });

  return RegistrationLog;
};
