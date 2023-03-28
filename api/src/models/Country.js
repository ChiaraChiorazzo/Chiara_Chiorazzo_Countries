const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    //el type de id será string ya que son 3 letras 
    id: {
       type: DataTypes.STRING(3),
       primaryKey:true,
       allowNull:false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flag: {
      type: DataTypes.STRING,
      allowNull:false,
    }, 
    continent: {
      type: DataTypes.STRING,
      allowNull:false,
    }, 
    capital: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    subregion: {
      type: DataTypes.STRING, 
      allowNull:true, 
    }, 
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    population : {
      type: DataTypes.INTEGER,
      allowNull:false,
    }

  }, {
    //elimino columnas que agrega por default
    timestamps: false,
      }
  );
};
