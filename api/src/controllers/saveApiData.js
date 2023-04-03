const axios = require("axios")
const {Country, Activity} = require("../db")


const getApiData = async () => {
try {
 
    //Brings all the info and save just the info that i'll need in an array
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
    return {error: error.message, msg:"Error when bringing the info from the API"}
}
}

const saveApiData = async () => {
    try {
    //Execute the function getApiData and save the info in AllCountries --> allCountries is an array of objects
        const allCountries = await getApiData()
        
    //bulkCreate alouds to send an array of objects and create them in the DB all at the same time not one by one
    await Country.bulkCreate(allCountries, {ignoreDuplicates:true})

    return allCountries

    } catch (error) {
        return {error: error.message, msg: "Error when trying to save the info in the DB"}
    }

}


module.exports = {
    saveApiData
}
