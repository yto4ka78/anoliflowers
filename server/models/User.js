const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    familyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: ["user"],
    },
    isVerified: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.associate = (models) => {
    User.hasMany(models.Orderdetails, {
      foreignKey: "userId",
      as: "orders",
    });
  };

  return User;
};
