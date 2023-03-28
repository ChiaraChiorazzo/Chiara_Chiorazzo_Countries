const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const CountryRouter = require('./CountryRouter')
const ActivityRouter = require('./ActivityRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', CountryRouter)
router.use('/activities', ActivityRouter)

//router.use('/activities', ActivityRouter)

module.exports = router;
