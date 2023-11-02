const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT
    },
    image:{
      type: DataTypes.TEXT
    },
    nationality:{
      type: DataTypes.STRING
    },
    dob:{
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {timestamps: false});
};