const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class ReadingListContents extends Model {}

ReadingListContents.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    readingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'reading_list', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blog', key: 'id' },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'reading_list_contents',
  }
);

module.exports = ReadingListContents;
