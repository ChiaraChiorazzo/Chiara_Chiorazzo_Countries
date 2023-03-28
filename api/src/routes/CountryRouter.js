const { Router } = require('express')

const { getAllCountries, getCountryById, getTheTotalityOfCountries } = require('../controllers/Country')

const router = Router()


router.get('/', async (req, res) => {
    try {
        const name = req.query.name
        const continent = req.query.continent
        const activity = req.query.activity
        const sort = req.query.sort
        const pageSize = 10; // Define el tamaño de cada página
        const page = req.query.page || 1; // Obtiene el número de página actual o asume que es 1 si no se proporciona
        let countriesToShow = await getAllCountries({ name, continent, activity, sort, pageSize, page});

        countriesToShow.countries.length ? res.status(200).json(countriesToShow) : res.status(404).json('no se encontraron paises con tales criterios')


    } catch (error) {
        return { error: error.message, msg: "Error en la ruta get AllCountries / GetCountriesByQuery" }

    }
})



router.get('/:idPais', async (req, res) => {
    try {
        const idPais = req.params.idPais
        const country = await getCountryById(idPais)

        if (country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("País no encontrado");
        }

    } catch (error) {
        return { error: error.message, msg: "Error en la ruta get Country by ID" }
    }


});

router.get('/allcountries/all', async (req,res) =>{
    try{
        let totalityOfCountries = await getTheTotalityOfCountries()
        if (totalityOfCountries) {
            return res.status(200).json(totalityOfCountries);
        } else {
            return res.status(404).send("No se encontraron paises");
        }
    }catch (error){
        return { error: error.message, msg: "Error en la ruta get the Totality of countries" }
    }
})

module.exports = router;