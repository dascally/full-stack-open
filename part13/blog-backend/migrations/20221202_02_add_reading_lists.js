const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    });
    await queryInterface.createTable('reading_list_contents', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reading_list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reading_list', key: 'id' },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_list_contents');
    await queryInterface.dropTable('reading_list');
  },
};
