const { Country, Activity } = require("../db")

const getAllActivities = async () => {
    try {
        const allActivities = await Activity.findAll()
        console.log(allActivities, "sjkdal")
        return allActivities

    } catch (error) {
        return { error: error.message, msg: "Error al intentar mostrar la info de la BD" }
    }
}

const createActivity = async ({  name, dificulty, duration, season, country }) => {
    //Valido que me envien toda la info 
    //hacerlo funcion 
    try{
    if(!name) throw new Error (" ame es dato requerido")
    if(!dificulty) throw new Error (" dificulty es dato requerido")
    if(!season) throw new Error (" season es dato requerido")
    if(!country) throw new Error ("country es dato requeridos")

    //Valido que countries sea un array
    if(!Array.isArray(country)) throw new Error ("Countries debe ser un array")
    if(country.length < 1) throw new Error ("debe contener al menos un pais ")
    

    //Agrego relacion 
    const activity = await Activity.create({name, dificulty, duration, season})
    const countries = await Country.findAll({where:{name:country}})
    await activity.addCountry(countries)
    return "actividad creada con Exito"

} catch (error){
    return { error: error.message }

}
}



module.exports = { getAllActivities, createActivity}