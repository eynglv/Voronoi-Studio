const Sequelize = require("sequelize");
const db = require("./database");

module.exports = db.define("voronois", {
  title: {
    type: Sequelize.STRING,
  },
  context: {
    type: Sequelize.TEXT,
  },
});
