const axios = require('axios');
const { Op } = require("sequelize");
const {Videogame, Genres} = require('../db');
require('dotenv').config();
const apikey = process.env.API_KEY;
const LIMIT = 25;
const URL = `https://api.rawg.io/api/games`
let URL3 = URL;
let URL2 = URL +`?key=${apikey}`+`&page_size=${LIMIT}`;

async function buscoenApi(juego){//"Bloodborne"

        let urlArray = [];
        urlArray.push(URL2)
        for (let i = 0; i < 4; i++){ 
          const videoApi = await axios.get(URL2);
          URL2 = videoApi.data.next;
          urlArray.push(URL2);//Arreglo de URL's
        }


          let apiArray = [];
          for (let i = 0; i < 4; i++){
            URL3 = urlArray[i];
            const videoApi = await axios.get(URL3);
            const videoMap = videoApi.data.results.map(video => {
              const platformname = video.platforms.map(platform => {
                return platform.platform.name})
              const genresname = video.genres.map(genres => {return {name:genres.name}})
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
                    return videoObj;
            })
            apiArray.push(videoMap);//Guarda en apiArray 4 arreglos con 25 videojuegos cada uno
          }
          let apiArray2 = [];
          for (let i = 0; i < 4; i ++){
            for (let j = 0; j < 25; j++){
                apiArray2.push(apiArray[i][j])//Genera un unico arreglo de objetos simulando el .data.results
            }
          }
        if (!juego) {
            return apiArray2;//Si no hay peticion por juego, regresa los 100 videojuegos
        }
         else {//Busca por juego
            const url = URL+`?key=${apikey}`+`&search=${juego}`;
            const videoApi = await axios.get(url);

            if (!videoApi.data) {
                throw new Error(`No Existe un video juego ${juego}`)
        
            } else {

              const videoMap = videoApi.data.results.map(video => {
                const platformname = video.platforms?.map(platform => {
                  return platform.platform.name})
                const genresname = video.genres?.map(genres => {return {name:genres.name}})
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
                      return videoObj;
              })
                return videoMap;
            }
        }
  }

const GET_ALL_VIDEOGAME = async (req, res) => {
    try{
      const name = req.query.search;
      if(name){
        const resultsBD = await Videogame.findAll({
          where: {
            name: {[Op.iLike]: `%${name}%`}
          },
          include: {
            model: Genres,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
      const resultsApi = await buscoenApi(name);

      //Unifica la informacion de la BD con la de la api 
      const response = [...resultsBD, ...resultsApi];
      res.status(200).json(response);
      } else {
        const resultsBD = await Videogame.findAll({
           include: {
            model: Genres,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        }); 
        const resultsApi = await buscoenApi(name);

        //Unifica la informacion de la BD con la de la api 
        const response = [...resultsBD, ...resultsApi];
        res.status(200).json(response);
      }
    }catch(error) {
       res.status(400).json({error: error.message});
    }
  }
  
  module.exports = {GET_ALL_VIDEOGAME};