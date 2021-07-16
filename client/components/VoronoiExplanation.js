/* eslint-disable react/display-name */
import chart from "./ExampleVoronoi";
import React, { useEffect } from "react";

export default () => {
	useEffect(() => {
		const exampleOne = chart.render("#example-one", 600, 1000);
		const exampleTwo = chart.render("#example-two", 600, 1000, 3);
		const interval = setInterval(() => {
			exampleOne.next();
			exampleTwo.next();
		}, 8);
		return () => clearInterval(interval);
	}, []);
	return (
		<div id="explanation">
			<h1 className="text-center display-3 mt-3">
				{" "}
				What the heck is a Voronoi Anyways?{" "}
			</h1>
			<p className="text-center mt-2 mb-3 mx-auto my-auto">
				Well, to quote{" "}
				<a href="https://en.wikipedia.org/wiki/Voronoi_diagram">
					wikipedia
				</a>
				, it's
			</p>
			<p className="text-center mt-2 mb-3 mx-auto my-auto">
				<blockquote className="blockquote">
					a partition of a plane into regions close to each of a given
					set of objects. In the simplest case, these objects are just
					finitely many points in the plane (called seeds, sites, or
					generators). For each seed there is a corresponding region,
					called a Voronoi cell, consisting of all points of the plane
					closer to that seed than to any other.{" "}
				</blockquote>
			</p>
			<p className="text-center mt-2 mb-3 mx-auto my-auto">
				To put it more plainly: if we put a bunch of dots on a piece of
				paper, canvas, or any other 2D surface, each dot will have a
				cell that contains everywhere on the 2D surface that's closer to
				it than any other dot. Consider the following example:
			</p>
			<canvas
				id="example-one"
				className="mx-auto mb-3"
				width="1000"
				height="600"
			>
				two cell example
			</canvas>
			<p className="text-center mt-2 mb-3 mx-auto my-auto">
				we have two cells: one red, one green. Everywhere on the
				dividing line is just as far from the dot in the red cell as it
				is from the dot in the green cell. Everywhere in the red cell is
				closer to the dot in it, and likewise for the green cell and its
				dot. If we have three cells, like so:
			</p>
			<canvas
				id="example-two"
				className="mx-auto mb-3"
				width="1000"
				height="600"
			>
				three cell example
			</canvas>
			<p className="text-center mt-2 mb-3 mx-auto my-auto">
				the same rules apply. Any line that runs between two dots is
				equidistant from both of them, and everything in a cell is
				closer to the dot in there than any of the others.
			</p>
		</div>
	);
};
