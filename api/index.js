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
const { conn } = require('./src/db.js');
const { saveApiData } = require("./src/controllers/saveApiData")

// Syncing all the models at once.
async function main() {
  try {
    await conn.sync({ alter: true }).then(async () => {
      console.log("DB connected")
      //console.log(await saveApiData())
      await saveApiData()
      server.listen(3001, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database", error)
  }
}
main()



