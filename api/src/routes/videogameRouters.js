const {Router} = require('express');

videogameRouters = Router();

const {GET_ALL_VIDEOGAME} = require('../controllers/GET_ALL_VIDEOGAMES');
const {GET_ID_VIDEOGAMES} = require('../controllers/GET_ID_VIDEOGAME');
const {CREATE_NEW} = require('../controllers/CREATE_NEW');
const {PUT_ID_VIDEOGAME} = require('../controllers/PUT_ID_VIDEOGAME');
const {DEL_VIDEOGAME} = require('../controllers/DEL_VIDEOGAME');

videogameRouters.get('/', GET_ALL_VIDEOGAME);

videogameRouters.get('/:idVideoGame', GET_ID_VIDEOGAMES );

videogameRouters.post('/create', CREATE_NEW);

videogameRouters.put('/actuality/:ID', PUT_ID_VIDEOGAME);

videogameRouters.delete('/delete/:ID', DEL_VIDEOGAME);

module.exports = videogameRouters;