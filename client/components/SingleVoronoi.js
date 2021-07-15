/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import chart from "./pulsate";
import axios from "axios";

export default (props) => {
	const [paintings, setPaintings] = useState([]);
	useEffect(() => {
		const getPaintings = async () => {
			const voronoiPaintings = (
				await axios.get(`/api/voronois/${props.voronoiId}`)
			).data;
			setPaintings(voronoiPaintings);
		};
		getPaintings();
	}, []);
	useEffect(() => {
		if (paintings.length) {
			const voronoiRender = chart.render(
				"#single-voronoi",
				600,
				1000,
				paintings
			);
			const interval = setInterval(() => voronoiRender.next(), 8);
			return () => clearInterval(interval);
		}
	}, [paintings]);
	return (
		<div>
			<h1 className="text-center display-3 mt-3">{props.voronoiId}</h1>
			<h3 className="text-center mb-2 mt-2">
				Curated by {props.curator}
			</h3>
			<canvas id="single-voronoi" className="mx-auto mb-3" width="1000" height="600"></canvas>
		</div>
	);
};
