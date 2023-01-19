const axios = require('axios');
const { where } = require('sequelize');
const {Videogame} = require('../db');

const PUT_ID_VIDEOGAME = async (req, res) =>{
    try{
        let {ID} = req.params;

        let {name, imagen, description, released, rating, platforms, genres} = req.body;
        console.log(platforms, genres)
        if( !name && !imagen && !description && !released && !rating && !platforms) throw new Error("Faltan Datos");
        if(typeof rating !== "number") throw new Error("Rating debe ser un valor numerico");
        
        const buscoVG = await Videogame.findByPk(ID);
        if (buscoVG){
          if (!name) name = buscoVG.name;
          if (!imagen) imagen = buscoVG.imagen;
          if (!description) description = buscoVG.description;
          if (!released) released = buscoVG.released;
          if (!rating) rating = buscoVG.rating;
          if (platforms.length === 0) platforms = buscoVG.platforms;

          console.log(platforms)

          await Videogame.update({name, imagen, description, released, rating, platforms}, 
            {where: {ID}});
          if (genres.length !== 0) await gamesActualizado.addGenres(genres);
        res.status(200).json({ success: "actualizado" });
          }
         else throw new Error("No existe videogame");
   } catch (error) {
     res.status(400).json({mge: error.message});
     }
}

module.exports = {PUT_ID_VIDEOGAME}; 
