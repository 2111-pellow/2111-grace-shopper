// 'use strict'

// const {db, models: {User} } = require('../server/db')

// /**
//  * seed - this function clears the database, updates tables to
//  *      match the models, and populates the database.
//  */
// async function seed() {
//   await db.sync({ force: true }) // clears db and matches models to tables
//   console.log('db synced!')

//   // Creating Users
//   const users = await Promise.all([
//     User.create({ username: 'cody', password: '123' }),
//     User.create({ username: 'murphy', password: '123' }),
//   ])

//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1]
//     }
//   }
// }

// /*
//  We've separated the `seed` function from the `runSeed` function.
//  This way we can isolate the error handling and exit trapping.
//  The `seed` function is concerned only with modifying the database.
// */
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// /*
//   Execute the `seed` function, IF we ran this module directly (`node seed`).
//   `Async` functions always return a promise, so we can use `catch` to handle
//   any errors that might occur inside of `seed`.
// */
// if (module === require.main) {
//   runSeed()
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed



const { db } = require("../server/db");

const User = require('../server/db/models/user')

const users =
[{"id": 1,firstName: "Fawne",lastName: "Lunt",email: "flunt0@va.gov",password: "WrwpJz",image: "http://dummyimage.com/x.png/cc0000/ffffff",creditCard: "3553386734099169"},
{"id":2, firstName: "Sarina",lastName: "Cranham",email: "scranham1@biglobe.ne.jp",password: "a11LEFOGHYM",image: "http://dummyimage.com/x.png/ff4444/ffffff",creditCard: "4844087180715467"},
{"id":3,"firstName":"Maiga","lastName":"Sigg","email":"msigg2@yahoo.co.jp","password":"dRGPjP","image":"http://dummyimage.com/x.png/5fa2dd/ffffff","creditCard":"30356510277759"},
{"id":4,"firstName":"Etheline","lastName":"Wardle","email":"ewardle3@washington.edu","password":"6Eq3Ld0sE","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"3557474566891576"},
{"id":5,"firstName":"Kori","lastName":"Doig","email":"kdoig4@chronoengine.com","password":"PValKs","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"56022106041440869"},
{"id":6,"firstName":"Calhoun","lastName":"Riley","email":"criley5@bbc.co.uk","password":"QK1wEhWpQipe","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"3543018002553295"},
{"id":7,"firstName":"Guntar","lastName":"Works","email":"gworks6@scientificamerican.com","password":"zYj5pkM4V","image":"http://dummyimage.com/x.png/ff4444/ffffff","creditCard":"3551452110394848"},
{"id":8,"firstName":"Britt","lastName":"Burroughes","email":"bburroughes7@addtoany.com","password":"zY3OpK","image":"http://dummyimage.com/x.png/5fa2dd/ffffff","creditCard":"3572512095378655"},
{"id":9,"firstName":"Sammy","lastName":"Camolli","email":"scamolli8@theglobeandmail.com","password":"dsHpmuHb","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"36215661618936"},
{"id":10,"firstName":"Marve","lastName":"Singyard","email":"msingyard9@taobao.com","password":"67QCvPsO0v","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"676743033920616471"},
{"id":11,"firstName":"Tripp","lastName":"Vasey","email":"tvaseya@pagesperso-orange.fr","password":"uPoJfsn","image":"http://dummyimage.com/x.png/cc0000/ffffff","creditCard":"3566326342490850"},
{"id":12,"firstName":"Eleanor","lastName":"Igoe","email":"eigoeb@bluehost.com","password":"5u4RVKVqT9Gu","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"5519215249540870"},
{"id":13,"firstName":"Thurston","lastName":"Charsley","email":"tcharsleyc@chronoengine.com","password":"eMB1c3WMfNz","image":"http://dummyimage.com/x.png/ff4444/ffffff","creditCard":"3546524213168432"},
{"id":14,"firstName":"Ashien","lastName":"Avraham","email":"aavrahamd@washington.edu","password":"zBafKvfOiHr","image":"http://dummyimage.com/x.png/cc0000/ffffff","creditCard":"3589227318519974"},
{"id":15,"firstName":"Gilemette","lastName":"Hadcroft","email":"ghadcrofte@admin.ch","password":"KPBexFSzqkFL","image":"http://dummyimage.com/x.png/cc0000/ffffff","creditCard":"30394033367864"},
{"id":16,"firstName":"Belinda","lastName":"Santer","email":"bsanterf@google.de","password":"uVLpiY2Xs","image":"http://dummyimage.com/x.png/5fa2dd/ffffff","creditCard":"5412925549721842"},
{"id":17,"firstName":"Meta","lastName":"Dunkerly","email":"mdunkerlyg@hubpages.com","password":"lZG3a9E5y3","image":"http://dummyimage.com/x.png/ff4444/ffffff","creditCard":"3557866914492769"},
{"id":18,"firstName":"Shep","lastName":"Nobes","email":"snobesh@myspace.com","password":"3NPjOcOV","image":"http://dummyimage.com/x.png/cc0000/ffffff","creditCard":"5048371044663407"},
{"id":19,"firstName":"Cristina","lastName":"Tombling","email":"ctomblingi@github.io","password":"0dFos4kN","image":"http://dummyimage.com/x.png/5fa2dd/ffffff","creditCard":"374283814021879"},
{"id":20,"firstName":"Berget","lastName":"Rainard","email":"brainardj@dedecms.com","password":"rQQ3iFHP15D","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"3559410320074750"},
{"id":21,"firstName":"Janella","lastName":"Logsdale","email":"jlogsdalek@ucoz.com","password":"rBdsHO7cwLN","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"3556224052982061"},
{"id":22,"firstName":"Jaime","lastName":"Quinlan","email":"jquinlanl@google.co.uk","password":"wbuhLlMgZ8bG","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"3537994524894912"},
{"id":23,"firstName":"Alisun","lastName":"De Vuyst","email":"adevuystm@dagondesign.com","password":"tld8hGM80v","image":"http://dummyimage.com/x.png/5fa2dd/ffffff","creditCard":"3536014665687073"},
{"id":24,"firstName":"Kacy","lastName":"Gartery","email":"kgarteryn@sohu.com","password":"YegNlwMY","image":"http://dummyimage.com/x.png/cc0000/ffffff","creditCard":"201523700563537"},
{"id":25,"firstName":"Codie","lastName":"Frantz","email":"cfrantzo@usa.gov","password":"E0PDT7xVP5L","image":"http://dummyimage.com/x.png/5fa2dd/ffffff","creditCard":"6759571749375366"},
{"id":26,"firstName":"Mead","lastName":"Clapson","email":"mclapsonp@squarespace.com","password":"L6ASCQhd","image":"http://dummyimage.com/x.png/ff4444/ffffff","creditCard":"6331105523200685"},
{"id":27,"firstName":"Essie","lastName":"Posselt","email":"eposseltq@jigsy.com","password":"vskN6N8","image":"http://dummyimage.com/x.png/cc0000/ffffff","creditCard":"374622234064896"},
{"id":28,"firstName":"Milton","lastName":"Paolo","email":"mpaolor@wordpress.com","password":"qpoNu4VCqfq","image":"http://dummyimage.com/x.png/ff4444/ffffff","creditCard":"6399825394724641"},
{"id":29,"firstName":"Kalvin","lastName":"Disman","email":"kdismans@yelp.com","password":"qtnJt9","image":"http://dummyimage.com/x.png/dddddd/000000","creditCard":"3579532525940216"},
{"id":30,"firstName":"Delly","lastName":"Pidduck","email":"dpidduckt@squidoo.com","password":"G5LOC3NM","image":"http://dummyimage.com/x.png/ff4444/ffffff","creditCard":"3566927484544493"}]


const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(users.map(user=> {
      return User.create(user);
    }));

  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;


if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch(err => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}

