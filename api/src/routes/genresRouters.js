const {Router} = require('express');

const genresRouter = Router();
const {GET_ALL_GENRES} = require('../controllers/GET_ALL_GENRES');

genresRouter.get('/', GET_ALL_GENRES);


module.exports = genresRouter;