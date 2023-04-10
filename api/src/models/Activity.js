const { DataTypes } = require('sequelize');

//exports the function that define the model and we inject to it sequelize
module.exports = (sequelize) => {
    //model definition: 
    sequelize.define('activity', {
        // UUID for the id 
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },

        dificulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
                isInt: true,
            },
        },
        duration: {
           
            type: DataTypes.INTEGER,
            allowNull: true,
           
        },
        season: {
            
            type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera'),
            allowNull: false,
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:true,
        }

    }, {
        timestamps: false,
    })
}
