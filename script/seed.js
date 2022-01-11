'use strict'

const {db, models: {User, Plant} } = require('../server/db')
const { green, red } = require("chalk");

//seed dummy data
const plants = [
  {
    id: 1,
    plant_name: "False Beardgrass",
    description: "Palindromic rheumatism",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$98.00",
  },
  {
    id: 2,
    plant_name: "Guayanan Waterclover",
    description: "Fall into natural body of water strk side causing oth injury",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$41.94",
  },
  {
    id: 3,
    plant_name: "Curly Mitchell Grass",
    description: "Displ transverse fx shaft of unsp rad, 7thH",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$17.37",
  },
  {
    id: 4,
    plant_name: "Silky Mousetail",
    description: "Disp fx of med condyle of unsp tibia, 7thH",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$37.46",
  },
  {
    id: 5,
    plant_name: "Toumeys Century Plant",
    description: "Complete traumatic MCP amputation of l mid finger, subs",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$40.31",
  },
  {
    id: 6,
    plant_name: "Semaphore Pricklypear",
    description: "Idiopathic chronic gout, right hip",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$69.68",
  },
  {
    id: 7,
    plant_name: "Pagumpa Milkvetch",
    description: "Injury of median nerve at upper arm level, left arm",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$87.58",
  },
  {
    id: 8,
    plant_name: "Eastern Turkeybeard",
    description: "Non-pressure chronic ulcer of right ankle w necrosis of bone",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$13.57",
  },
  {
    id: 9,
    plant_name: "Donner Lake Lupine",
    description: "Other burn on board sailboat, initial encounter",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$53.47",
  },
  {
    id: 10,
    plant_name: "Crescent Milkvetch",
    description: "Fall due to uncontrolled fire, not in building or structure",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$2.37",
  },
  {
    id: 11,
    plant_name: "Mycobilimbia Lichen",
    description: "Nondisp fx of med epicondyl of unsp humer, 7thD",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$63.59",
  },
  {
    id: 12,
    plant_name: "Longleaf Groundcherry",
    description: "Oth osteopor w crnt path fx, unsp ank/ft, 7thD",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$51.08",
  },
  {
    id: 13,
    plant_name: "Hazel Sterculia",
    description: "Obs & eval of NB for unsp suspected condition ruled out",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$99.21",
  },
  {
    id: 14,
    plant_name: "Copernicia",
    description: "Laceration of unsp blood vessel at shldr/up arm, right arm",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$44.30",
  },
  {
    id: 15,
    plant_name: "Lions Tail",
    description: "Toxic effect of smoke, assault",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$22.04",
  },
  {
    id: 16,
    plant_name: "Panhandle Spurge",
    description: "Laceration w fb of abd wall, epigst rgn w penet perit cav",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$81.29",
  },
  {
    id: 17,
    plant_name: "Puerto Rico Swallow-wort",
    description: "Pedl cyc driver injured in clsn w rail trn/veh in traf, init",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$17.51",
  },
  {
    id: 18,
    plant_name: "Kings Flax",
    description: "Disp fx of shaft of first MC bone, unsp hand, sequela",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$11.83",
  },
  {
    id: 19,
    plant_name: "Hybrid Blazing Star",
    description: "Injury of musculocutaneous nerve, right arm, sequela",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$63.49",
  },
  {
    id: 20,
    plant_name: "Alder",
    description: "Intermittent exophthalmos, left eye",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$5.73",
  },
  {
    id: 21,
    plant_name: "Mt. Diablo Manzanita",
    description: "Disp fx of med epicondyl of r humer, subs for fx w malunion",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$11.76",
  },
  {
    id: 22,
    plant_name: "Slightstemmed Miterwort",
    description: "Unspecified trochanteric fracture of right femur, sequela",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$84.19",
  },
  {
    id: 23,
    plant_name: "Lespedeza",
    description: "Displ subtrochnt fx l femur, subs for clos fx w delay heal",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$49.16",
  },
  {
    id: 24,
    plant_name: "Dwarf Milkvetch",
    description: "Bent bone of left ulna, subs for clos fx w malunion",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$59.50",
  },
  {
    id: 25,
    plant_name: "Aloina Moss",
    description: "Disp fx of neck of second metacarpal bone, right hand, init",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$68.78",
  },
  {
    id: 26,
    plant_name: "Oreoxis",
    description: "Displacement of permanent sutures",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$61.81",
  },
  {
    id: 27,
    plant_name: "Chase Threeawn",
    description: "Crushing injury of right index finger",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$97.02",
  },
  {
    id: 28,
    plant_name: "Seliger Herzogiella Moss",
    description: "Sltr-haris Type IV physeal fx upper end radius, left arm",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$9.21",
  },
  {
    id: 29,
    plant_name: "Annual Buckwheat",
    description: "Bucket-hndl tear of unsp meniscus, current injury, r knee",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$15.98",
  },
  {
    id: 30,
    plant_name: "Silver Prairie Clover",
    description: "Other subluxation of left knee, sequela",
    imageUrl: "http://dummyimageUrl.com/x.png/5fa2dd/ffffff",
    price: "$58.63",
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  await Plant.bulkCreate(plants);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}



/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
