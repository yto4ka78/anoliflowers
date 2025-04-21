module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    showInNavbar: {
      type: DataTypes.BOOLEAN,
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

  Category.associate = (models) => {
    Category.belongsToMany(models.Bouquet, {
      through: "BouquetCategory",
      foreignKey: "category_id",
    });
  };

  return Category;
};
