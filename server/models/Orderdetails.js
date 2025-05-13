module.exports = (sequelize, DataTypes) => {
  const Orderdetails = sequelize.define("Orderdetails", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    emailuser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sendername: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senderfamilyname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sendernumberphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipientname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipientnumberphone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bouquets: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const raw = this.getDataValue("bouquets");
        return raw ? JSON.parse(raw) : [];
      },
      set(value) {
        this.setDataValue("bouquets", JSON.stringify(value));
      },
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed"),
      defaultValue: "pending",
      allowNull: false,
    },
  });

  Orderdetails.associate = (models) => {
    Orderdetails.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Orderdetails;
};
