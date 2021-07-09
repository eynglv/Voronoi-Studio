const router = require("express").Router();
module.exports = router;

router.use("/paintings", require("./paintings"));
router.use("/voronois", require("./voronois"));

router.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});
