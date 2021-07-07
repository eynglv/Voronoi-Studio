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
