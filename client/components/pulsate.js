const chart = {
	*render(selector, height, width, cellCount) {
		const canvas = d3.select(selector);
		console.log(canvas);
		const n = 200;
		const context = canvas.node().getContext("2d");
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
		let j = 0;
		while (j < 1000000000) {
			context.fillStyle = "#ffffff33";
			context.fillRect(0, 0, width, height);
			context.fillStyle = "black";

			for (let i = 0; i < positions.length; ++i) {
				const size = i & 1 ? height : width;
				positions[i] += velocities[i];
				if (positions[i] < 0) positions[i] += size;
				else if (positions[i] > size) positions[i] -= size;
				velocities[i] +=
					0.2 * (Math.random() - 0.5) - 0.01 * velocities[i];
			}

			context.beginPath();
			voronoi.update().render(context);
			voronoi.renderBounds(context);
			context.stroke();

			context.beginPath();
			voronoi.delaunay.renderPoints(context, 1);
			context.fill();
			j++;

			yield context.canvas;
		}
	},
};
// const chart = { *generator(selector, height, width, cellCount){
// }

export default chart;
