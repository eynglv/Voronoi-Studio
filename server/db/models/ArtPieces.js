const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("artPieces", {
	objectID: {
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
	endDate: {
		type: Sequelize.INTEGER,
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
	culture: {
		type: Sequelize.STRING,
	},
	country: {
		type: Sequelize.STRING,
	},
	isHighlighted: {
		type: Sequelize.DataTypes.BOOLEAN,
	},
});
