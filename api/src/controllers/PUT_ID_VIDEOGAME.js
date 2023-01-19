const axios = require('axios');
const { where } = require('sequelize');
const {Videogame} = require('../db');

const PUT_ID_VIDEOGAME = async (req, res) =>{
    try{
        let {ID} = req.params.slice(1, length);
          console.log("ID por params", ID, typeof ID)

        const {name, imagen, description, released, rating, platforms, genres} = req.body;

        
        if( !name || !imagen) throw new Error("Faltan Datos");
        if(typeof rating !== "number") throw new Error("Rating debe ser un valor numerico");
        const gamesActualizado = await Videogame.update({name, imagen, description, released, rating, platforms}, 
          {where: {ID}});
        // await gamesActualizado.addGenres(genres);
        if (gamesActualizado) res.status(200).json({ success: "actualizado" });
         else throw new Error("El videoGame no pudo ser actualizado")
   } catch (error) {
     res.status(400).json({mge: error.message});
     }
}

module.exports = {PUT_ID_VIDEOGAME}; 
