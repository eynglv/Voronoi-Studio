/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import chart from "./pulsate";
import axios from "axios";
import Navbar from "./Navbar";

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
				720,
				1080,
				paintings
			);
			const interval = setInterval(() => voronoiRender.next(), 8);
			return () => clearInterval(interval);
		}
	}, [paintings]);
	return (
		<div>
			<Navbar />
			<h1>{props.voronoiId}</h1>
			<canvas id="single-voronoi" width="1080" height="720"></canvas>
		</div>
	);
};
