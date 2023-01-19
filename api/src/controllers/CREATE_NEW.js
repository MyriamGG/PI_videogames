const {Videogame} = require("../db.js");

const CREATE_NEW = async (req, res) => {
    try{
        const {name, imagen, description, released, rating, platforms, genres} = req.body;
          
        if( !name || !imagen) throw new Error("Faltan Datos");
        if(typeof rating !== "number") throw new Error("Rating debe ser un valor numerico");
        const newgames = await Videogame.create({name, imagen, description, released, rating, platforms});
        await newgames.addGenres(genres);
        res.status(200).json({ success: "created" });
   } catch (error) {
     res.status(400).json({mge: error.message});
     }
}

module.exports = {CREATE_NEW}; 