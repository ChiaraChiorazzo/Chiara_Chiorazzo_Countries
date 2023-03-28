const axios = require("axios")
const {Country, Activity} = require("../db")


const getApiData = async () => {
try {
 
    //traigo toda la info y la guardo en el array
    const  response  = await axios.get('https://restcountries.com/v3/all');
    
    let apiInfo = response.data.map(({cca3, name, flags, continents, capital, subregion, area, population}) => (
         {
            id: cca3,
            name: name.common,
            flag: flags[0],
            continent: continents[0],
            capital: capital ? capital[0] : "Capital not found", 
            subregion: subregion ? subregion : "Subregion not found",
            area: area,
            population: population,
          }
    ))
    return apiInfo

} catch (error) {
    return {error: error.message, msg:"Error en el map o trayendo la info de la Api"}
}
}

const saveApiData = async () => {
    try {
    //ejecuta la funcion getApiData y guarda toda la info en una variable --> allCountries es un array de objetos 
        const allCountries = await getApiData()
        
    //bulkCreate permite pasarle un array de objetos y los crea todos juntos en la BD, no crea uno por un
    await Country.bulkCreate(allCountries, {ignoreDuplicates:true})

    return allCountries

    } catch (error) {
        return {error: error.message, msg: "Error al intentar guardar la informacion en la DB"}
    }

}


module.exports = {
    saveApiData
}
