const axios = require('axios');
const {Videogame, Genres} = require('../db');
require('dotenv').config();
const apikey = process.env.API_KEY;
const URL = `https://api.rawg.io/api/games`;

const GET_ID_VIDEOGAMES = async (req, res) => {
    const {idVideoGame} = req.params;

    try{
        if (!idVideoGame) {
            throw new Error(`No existe un ID ${idVideoGame}`)}
        else {
           if (idVideoGame.length > 7){
                const videoDB = await Videogame.findByPk(idVideoGame, {
                include: [{model: Genres, 
                   attributes: ["ID", "name"],
                   through: {
                        attributes: [],
                    }
                    }]
                });
                if (videoDB !== null) 
                    res.status(200).json(videoDB);
            } 
            else {
  
            const urlID = URL+`/${idVideoGame}`+`?key=${apikey}`;
            const videoApi = await axios.get(urlID);
            if (videoApi.data){
                    const video = videoApi.data;
                     const platformname = video.platforms.map(platform => {
                        return platform.platform.name})
                    const genresname = video.genres.map(genres => {
                        return {
                            id: genres.id,
                            name: genres.name}}
                        )
                        const videoObj = {
                             ID: video.id,
                            name: video.name,
                            imagen: video.background_image,
                            description: video.description,
                            released: video.released,
                            rating: video.rating,
                            platforms: platformname,
                            genres: genresname
                        }
  
                    res.status(200).send(videoObj);
                }
            }
        }
    } catch (error) {
        if (error.response.status === 404) res.status(404).json({mge: `No Existe un video juego con codigo ${idVideoGame}` })
        else res.status(404).json({msg: error.message})
    }
}

module.exports = {GET_ID_VIDEOGAMES};