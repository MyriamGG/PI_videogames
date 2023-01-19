//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genres } = require('./src/db.js');
require('dotenv').config();
const axios = require("axios");
const apikey = process.env.API_KEY;
const URL = "https://api.rawg.io/api/genres";
const LIMIT = 10;


 function precarga(){
// Trae info de la api
    axios.get(URL+`?key=${apikey}`+`&limit=${LIMIT}`)
      .then(apigenres =>{
         const genres =  apigenres.data.results.map(genre => {
            const genreObj = {
              ID: genre.id,
              name: genre.name
            }
            return genreObj;
          })

        //crea los generos en la base de datos
        Genres.bulkCreate(genres);
      });
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  precarga();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
