const { Router } = require('express')
const { getAllActivities, createActivity} = require('../controllers/Activity')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const activities = await getAllActivities();
    
        if (activities) {
            res.status(200).json(activities)
        } else {
            res.status(404).send('activities not founded')
        }
    } catch (error) {
        return { error: error.message, msg: "Error in the route Activities " }
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            name,
            dificulty,
            duration,
            season,
            country,
        } = req.body
        const newActivity = await createActivity({ name, dificulty, duration, season, country})
        if (newActivity) {
            res.status(200).json(newActivity)
        } else {
            res.status(400).send("Missing information")
        }
    } catch (error) {

        return { error: error.message, msg: "Error in the route post Activity " }

    }
})


module.exports = router