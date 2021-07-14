const router = require("express").Router();
const {
	models: { ArtPieces, Voronoi, VoronoiElements},
} = require("../db");
module.exports = router;

//mounted on /api/voronois

//get routes

router.get("/:voronoiTitle", async (req, res, next) => {
	try {
		const voronoi = await Voronoi.findOne({
			where:
			{title: req.params.voronoiTitle}
		});
		if (voronoi){
      const art = await voronoi.getArtPieces()
      res.json(art);
    } 
		else res.status(404).send("No paintings for that voronoi");
	} catch (err) {
		next(err);
	}
});