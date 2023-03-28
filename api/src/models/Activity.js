const { DataTypes } = require('sequelize');

//exportamos la funcion que define al modelo y le inyectamos la conexión a sequelize
module.exports = (sequelize) => {
    //definimos nuestro modelo: 
    sequelize.define('activity', {
        //uso UUID para el id 
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
            //suponiendo que puede durar 1.5 horas es decir hora y media
            type: DataTypes.INTEGER,
            allowNull: true,
            // validate: {
            //     min: 0,
            // },
        },
        season: {
            //solo puede ser una de las 4 estaciones 
            type: DataTypes.ENUM('verano', 'otoño', 'invierno', 'primavera'),
            allowNull: false,
        }

    }, {
        timestamps: false,
    })
}
