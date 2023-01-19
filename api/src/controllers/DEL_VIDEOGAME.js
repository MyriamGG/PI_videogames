const {Videogame} = require('../db');
const { where } = require('sequelize');

const DEL_VIDEOGAME = async (req, res) => {
    const {ID} = req.params;
    try{
        const buscoVG = await Videogame.findByPk(ID);
        if (buscoVG){
           await Videogame.destroy({where: {ID}})
           res.status(200).json({ success: "eliminado" })
        } else throw new Error("El videoGame no existe");
        
    } catch (error) {
        res.status(400).json({mge: error.message});
    }
}

module.exports = {DEL_VIDEOGAME};