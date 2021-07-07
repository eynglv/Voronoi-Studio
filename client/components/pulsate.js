import womenByWomen from "../../script/artdata/womenByWomen";
const chart = {
	*render(selector, height, width, cellCount = 20) {
		const canvas = d3.select(selector);
		const n = cellCount;
		const context = canvas.node().getContext("2d");
		const patterns = [];
		const images = womenByWomen.map((painting, index) => {
			const image = new Image();
			image.src = painting.primaryImageSmall;
			image.width = image.naturalWidth;
			image.height = image.naturalHeight;
			image.onload = function () {
				patterns[index] = context.createPattern(image, "repeat");
			};
			return image;
		});
		console.log(patterns);
		const positions = Float64Array.from(
			{ length: n * 2 },
			(_, i) => Math.random() * (i & 1 ? height : width)
		);
		const velocities = new Float64Array(n * 2);
		const voronoi = new d3.Delaunay(positions).voronoi([
			0.5,
			0.5,
			width - 0.5,
			height - 0.5,
		]);
		console.log(voronoi.cellPolygons());

		while (true) {
			context.fillStyle = "ffffff30";
			context.fillRect(0, 0, width, height);
			// context.fillStyle = "white";

			for (let i = 0; i < positions.length; ++i) {
				const size = i & 1 ? height : width;
				positions[i] += velocities[i];
				if (positions[i] < 0) positions[i] += size;
				else if (positions[i] > size) positions[i] -= size;
				velocities[i] +=
					0.2 * (Math.random() - 0.5) - 0.01 * velocities[i];
			}
			voronoi.update();
			for (let i = 0; i < positions.length / 2; i++) {
				context.fillStyle = patterns[i % patterns.length];
				context.beginPath();
				voronoi.renderCell(i, context);
				context.fill();
			}
			context.beginPath();
			// voronoi.update().render(context);
			voronoi.renderBounds(context);
			context.stroke();

			context.beginPath();
			voronoi.delaunay.renderPoints(context, 1);
			context.fill();

			yield context.canvas;
		}
	},
};
// const chart = { *generator(selector, height, width, cellCount){
// }

export default chart;
