const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogameRouters = require('./videogameRouters');
const genresRouters = require('./genresRouters');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame', videogameRouters);
router.use('/genres', genresRouters);

module.exports = router;
