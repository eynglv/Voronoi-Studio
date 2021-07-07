"use strict";

const {
  db,
  models: { User, ArtPieces, Voronoi },
} = require("../server/db");
const femaleNudesByMen = require("./artdata/femaleNudesByMen");
const womenByWomen = require("./artdata/womenByWomen");
const nonEuro = require("./artdata/non-european-art");
const american = require("./artdata/american");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  const voronois = await Promise.all([
    Voronoi.create({
      title: "Women By Women",
      context: "Depictions of women by women",
    }),
    Voronoi.create({
      title: "Women By Men",
      context: "Female nudes created by men",
    }),
    Voronoi.create({
      title: "American Art",
      context: "A collection of highlighted American artworks.",
    }),
    Voronoi.create({
      title: "Non-Western Art",
      context:
        "Art from a diverse collection of countries whose paintings are underrepresented in highlighted work",
    }),
  ]);

  const femaleNudes = await Promise.all(
    femaleNudesByMen.map((painting) => {
      return ArtPieces.create(painting);
    })
  );

  const women = await Promise.all(
    womenByWomen.map((painting) => {
      return ArtPieces.create(painting);
    })
  );

  const nonAmerican = await Promise.all(
    nonEuro.map((painting) => {
      return ArtPieces.create(painting);
    })
  );

  const usa = await Promise.all(
    american.map((painting) => {
      return ArtPieces.create(painting);
    })
  );

  await Promise.all(
    femaleNudes.map((instance) => instance.addVoronoi(voronois[1]))
  );

  await Promise.all(women.map((instance) => instance.addVoronoi(voronois[0])));

  await Promise.all(
    nonAmerican.map((instance) => instance.addVoronoi(voronois[3]))
  );

  await Promise.all(usa.map((instance) => instance.addVoronoi(voronois[2])));

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`);
  return {
    voronois,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
