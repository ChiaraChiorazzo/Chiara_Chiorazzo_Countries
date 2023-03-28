
const { Country, Activity } = require("../db")

const getAllCountries = async ({ name, continent, activity, sort, pageSize, page }) => {
    try {
        let allCountries = await Country.findAll(
            {
                //queremos que además de mostranos los paises nos traiga que actividades se realizan en estos, por eso le decimos que tamb incluya Activity.
                include: {
                    model: Activity,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })
        
        //Este if es el de ordenamiento si por query le paso sort=A-Z me lo ordena ascendente, si le paso sort=Z-A me lo ordena descendiente by name, si le paso Pop ordena por cant de habitantes
        if (sort === "A-Z") {
            allCountries = await allCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "Z-A") {
            allCountries = await allCountries.sort((a, b) => b.name.localeCompare(a.name));
        }else if (sort === "PopLow-High") {
            allCountries = await allCountries.sort((a, b) => a.population - b.population);
        } else if (sort === "PopHigh-Low") {
            allCountries = await allCountries.sort((a, b) => b.population - a.population);
        }

       // filtro por actividad y continente
       
        if (activity) {
            allCountries = await allCountries.filter(country => {
                return country.activities.some(act => act.name.toLowerCase().includes(activity.toLowerCase()));
            });

            //filtro solo por continente     
        }  if (continent) {
            allCountries = await allCountries.filter(country => country.continent.toLowerCase().includes(continent.toLowerCase()))
        }  if (name) {
            allCountries = await allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
        }

        //Pages
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const countriesToShow = allCountries.slice(startIndex, endIndex);

        const totalPages = Math.ceil(allCountries.length / pageSize)
        const currentPage = parseInt(page)
        return {
            //cambien countries: countriesToShow a allCountries
            countries: countriesToShow, totalPages, currentPage
        }
    } catch (error) {
        return { error: error.message, msg: "Error al intentar mostrar la info de la BD" }
    }
}


const getCountryById = async (idPais) => {
    try {
        const country = await Country.findOne({
            where: {
                id: idPais.toUpperCase()
            },
            include: [{
                model: Activity,
                attributes: ['name', 'dificulty', 'duration', 'season',],
                through: { attributes: [] }
            }]
        })
        return country
    } catch (error) {
        return { error: error.message, msg: "Error al intentar mostrar la info de la BD " }
    }
}

const getTheTotalityOfCountries = async() =>{
    try {
        let totalityOfCountries = await Country.findAll(
            {
                //queremos que además de mostranos los paises nos traiga que actividades se realizan en estos, por eso le decimos que tamb incluya Activity.
                include: {
                    model: Activity,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })
            console.log("estos son la totalidad de paises", totalityOfCountries )
            return totalityOfCountries
    } catch (error) {
        return { error: error.message, msg: "Error al intentar mostrar la info de la BD " }
    }
}

module.exports = { getAllCountries, getCountryById , getTheTotalityOfCountries}