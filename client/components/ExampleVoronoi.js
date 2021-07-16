const chart = {
	*render(selector, height, width, cellCount = 2) {
		const canvas = d3.select(selector);

		// console.log(canvas);
		const context = canvas.node().getContext("2d");
		const colors = ["#a63d40", "#7d8570", "#5F7C8C"];

		const positions = Float64Array.from(
			{ length: cellCount * 2 }, //create an array of alternating x and y coordinates
			(_, i) => Math.random() * (i & 1 ? height : width) //that are between 0 and heigh and width, respectively
		);

		const velocities = new Float64Array(cellCount * 2); //create an array of alternating x and y velocities
		const voronoi = new d3.Delaunay(positions).voronoi([
			0.5,
			0.5,
			width - 0.5,
			height - 0.5,
		]); //create a new voronoi from our positions array, with infinite polygons clipped at the provided minimums and maximums

		while (true) {
			//we will yield control back to the caller at the end of this loop, so it isn't actually infinite

			//below block creates semitransparent rectangle over entire canvas

			// context.fillStyle = "ffffff30";
			// context.fillRect(0, 0, width, height);
			// context.fillStyle = "white";

			for (let i = 0; i < positions.length; ++i) {
				//change every position
				const size = i & 1 ? height : width; //alternate between height and width
				positions[i] += velocities[i]; //change the position based on corresponding velocity

				//below code block causes cells to wrap around

				// if (positions[i] < 0) positions[i] += size;
				// //if position is less than 0, wrap around to the other side
				// else if (positions[i] > size) positions[i] -= size; //if position is greater than the canvas, wrap around to the other side

				//below code block causes cells to bounce off of edges
				if (positions[i] < 0) {
					positions[i] *= -1;
					velocities[i] *= -1;
				} else if (positions[i] > size) {
					positions[i] = 2 * size - positions[i];
					velocities[i] *= -1;
				}
				velocities[i] +=
					0.2 * (Math.random() - 0.5) - 0.01 * velocities[i]; //change the velocity by a random amount, with some consideration for it's previous value
			}

			// delaunay.update();
			voronoi.update(); //update the voronoi diagram with the new positions

			for (let i = 0; i < cellCount; i++) {
				//for each cell
				context.fillStyle = colors[i % colors.length]; //choose the next pattern in the array, looping back to the beginning if we go out of bounds
				context.beginPath(); //start a new path
				voronoi.renderCell(i, context); //trace the path of the current cell
				context.fill(); //fill the cell withour chosen pattern
			}
			//render dots in each cell

			context.fillStyle = "#FFF8F0";
			context.beginPath();
			voronoi.delaunay.renderPoints(context, 5);
			context.fill();

			//below block renders lines between cells
			context.lineWidth = 9;
			context.beginPath();
			voronoi.render(context);
			voronoi.renderBounds(context);
			context.stroke();

			yield context.canvas; //return to caller with the canvas
		}
	},
};
// const chart = { *generator(selector, height, width, cellCount){
// }

export default chart;
