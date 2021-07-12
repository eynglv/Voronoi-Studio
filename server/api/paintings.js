const router = require("express").Router();
const {
	models: { ArtPieces },
} = require("../db");
module.exports = router;

//mounted on /api/paintings

//get routes
router.get("/", async (req, res, next) => {
	try {
		const paintings = await ArtPieces.findAll();
		res.json(paintings);
	} catch (err) {
		next(err);
	}
});
router.get("/:paintingId", async (req, res, next) => {
	try {
		const painting = await ArtPieces.findByPk(req.params.paintingId);
		if (painting) res.json(painting);
		else res.status(404).send("No painting with that ID");
	} catch (err) {
		next(err);
	}
});
