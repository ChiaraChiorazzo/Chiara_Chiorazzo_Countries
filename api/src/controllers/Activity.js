const { Country, Activity } = require("../db")

const getAllActivities = async () => {
    try {
        const allActivities = await Activity.findAll()
        return allActivities

    } catch (error) {
        return { error: error.message, msg: "Error when trying to show the info from DB" }
    }
}

const createActivity = async ({  name, dificulty, duration, season, country }) => {
    //Validate if i receive all the information needed
    try{
    if(!name) throw new Error (" name is required")
    if(!dificulty) throw new Error (" dificulty is required")
    if(!season) throw new Error (" season is required")
    if(!country) throw new Error ("country is required")

    //Country is an array?
    if(!Array.isArray(country)) throw new Error ("Countries must be an array")
    if(country.length < 1) throw new Error ("country must have at least one country ")
    

    //Relation between activity and country
    const activity = await Activity.create({name, dificulty, duration, season})
    const countries = await Country.findAll({where:{name:country}})
    await activity.addCountry(countries)
    return "Your activity has been created"

} catch (error){
    return { error: error.message }

}
}



module.exports = { getAllActivities, createActivity}