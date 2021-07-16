/* eslint-disable react/display-name */
import chart from "./ExampleVoronoi";
import React, { useEffect } from "react";

export default () => {
	useEffect(() => {
		const exampleOne = chart.render("#example-one", 600, 1000);
		const exampleTwo = chart.render("#example-two", 600, 100, 3);
		const interval = setInterval(() => {
			exampleOne.next();
			exampleTwo.next();
		}, 8);
		return () => clearInterval(interval);
	}, []);
	return (
		<div>
			<canvas
				id="example-one"
				className="mx-auto mb-3"
				width="1000"
				height="600"
			></canvas>
			<canvas
				id="example-two"
				className="mx-auto mb-3"
				width="1000"
				height="600"
			></canvas>
		</div>
	);
};
