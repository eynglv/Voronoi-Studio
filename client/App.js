import React from "react";
<<<<<<< HEAD

import Navbar from "./components/Navbar";
import Routes from "./Routes";
// import * as d3 from 'd3'
// import { Delaunay } from 'd3-delaunay'

class App extends React.Component {
  componentDidMount() {
    const square = d3.selectAll("rect");
    square.style("fill", "orange");
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
=======
import container from "./components/vornoi";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
// import { d3 } from "d3";
// import { Delaunay } from "d3-delaunay";
// import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6%22";

class App extends React.Component {
	componentDidMount() {
		container.render("#svg1", 10);
		// container.render("#svg2", 10);
	}
	render() {
		return (
			<div>
				<Navbar />
				<Routes />
			</div>
		);
	}
>>>>>>> 91565ba556b98ee103e74d8febc7fc76440634d9
}

export default App;
