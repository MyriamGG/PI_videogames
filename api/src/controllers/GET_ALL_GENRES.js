const {Genres} = require("../db.js");

const GET_ALL_GENRES = async (req, res) => {
    try{
        const genresBD = await Genres.findAll();
        res.status(200).json(genresBD);
    }
    catch (error) {
        res.status(400).json({mge: error.message});
    }
    
};

module.exports = {GET_ALL_GENRES};