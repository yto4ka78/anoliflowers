module.exports = (sequelize, DataTypes) => {
  const Bouquet = sequelize.define("Bouquet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("imageUrl");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("imageUrl", JSON.stringify(value));
      },
    },
  });

  Bouquet.associate = (models) => {
    Bouquet.belongsToMany(models.Category, {
      through: "BouquetCategory",
      foreignKey: "bouquet_id",
    });
  };

  return Bouquet;
};
