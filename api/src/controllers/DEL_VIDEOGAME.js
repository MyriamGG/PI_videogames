const {Videogame} = require('../db');
const { where } = require('sequelize');

const DEL_VIDEOGAME = async (req, res) => {
    console.log("ID POR PARAMS", req.params.ID)
    let {ID} = req.params;

    try{
    
        const result = await Videogame.destroy({where: {ID}})
            if (result) res.status(200).json({ success: "eliminado" })
             else throw new Error("El videoGame no existe");
        
    } catch (error) {
        res.status(400).json({mge: error.message});
    }
}

module.exports = {DEL_VIDEOGAME};