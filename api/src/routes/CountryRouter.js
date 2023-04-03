const { Router } = require('express')

const { getAllCountries, getCountryById, getTheTotalityOfCountries } = require('../controllers/Country')

const router = Router()


router.get('/', async (req, res) => {
    try {
        const name = req.query.name
        const continent = req.query.continent
        const activity = req.query.activity
        const sort = req.query.sort
        const pageSize = 10; // size of each page
        const page = req.query.page || 1; // actual page number or asumes that is 1
        let countriesToShow = await getAllCountries({ name, continent, activity, sort, pageSize, page});

        countriesToShow.countries.length ? res.status(200).json(countriesToShow) : res.status(404).json('Sorry, we could not find countries with those parameters!')


    } catch (error) {
        return { error: error.message, msg: "Error in the route GetCountriesByQuery" }

    }
})



router.get('/:idPais', async (req, res) => {
    try {
        const idPais = req.params.idPais
        const country = await getCountryById(idPais)

        if (country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("Country not found");
        }

    } catch (error) {
        return { error: error.message, msg: "Error in the route get Country by ID" }
    }


});

router.get('/allcountries/all', async (req,res) =>{
    try{
        let totalityOfCountries = await getTheTotalityOfCountries()
        if (totalityOfCountries) {
            return res.status(200).json(totalityOfCountries);
        } else {
            return res.status(404).send("countries not found");
        }
    }catch (error){
        return { error: error.message, msg: "Error in the route get the Totality of countries" }
    }
})

module.exports = router;