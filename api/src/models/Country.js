const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  sequelize.define('country', {
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
    //Delete the columns added by default
    timestamps: false,
      }
  );
};
