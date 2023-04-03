
const { Country, Activity } = require("../db")

const getAllCountries = async ({ name, continent, activity, sort, pageSize, page }) => {
    try {
        let allCountries = await Country.findAll(
            {
                //brings the countries including the activities done in each country
                include: {
                    model: Activity,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })

        //sorter by name or by population
        if (sort === "A-Z") {
            allCountries = await allCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "Z-A") {
            allCountries = await allCountries.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sort === "PopLow-High") {
            allCountries = await allCountries.sort((a, b) => a.population - b.population);
        } else if (sort === "PopHigh-Low") {
            allCountries = await allCountries.sort((a, b) => b.population - a.population);
        }

        // filter by activity 
        if (activity) {
            allCountries = await allCountries.filter(country => {
                return country.activities.some(act => act.name.toLowerCase().includes(activity.toLowerCase()));
            });

            //filter by continent     
        } if (continent) {
            allCountries = await allCountries.filter(country => country.continent.toLowerCase().includes(continent.toLowerCase()))
        } if (name) {
            allCountries = await allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
        }

        //Pages
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const countriesToShow = allCountries.slice(startIndex, endIndex);

        const totalPages = Math.ceil(allCountries.length / pageSize)
        const currentPage = parseInt(page)
        return {

            countries: countriesToShow, totalPages, currentPage
        }
    } catch (error) {
        return { error: error.message, msg: "Error when trying to show info from DB" }
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
        return { error: error.message, msg: "Error when trying to show info form DB " }
    }
}

const getTheTotalityOfCountries = async () => {
    try {
        let totalityOfCountries = await Country.findAll(
            {
                include: {
                    model: Activity,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            })

        return totalityOfCountries
    } catch (error) {
        return { error: error.message, msg: "Error when trying to show info from DB " }
    }
}

module.exports = { getAllCountries, getCountryById, getTheTotalityOfCountries }