const Sequelize = require("sequelize");
const db = require("../db");

const ArtPieces = db.define("artPieces", {
  objectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: Sequelize.STRING,
  },
  artistDisplayName: {
    type: Sequelize.STRING,
  },
  artistGender: {
    type: Sequelize.STRING,
  },
  primaryImage: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  primaryImageSmall: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  endDate: {
    type: Sequelize.INTEGER,
  },
  country: {
    type: Sequelize.STRING,
  },
  culture: {
    type: Sequelize.STRING,
  },
  isHighlight: {
    type: Sequelize.DataTypes.BOOLEAN,
  },
  isPublicDomain: {
    type: Sequelize.DataTypes.BOOLEAN,
  },
});

module.exports = ArtPieces;
