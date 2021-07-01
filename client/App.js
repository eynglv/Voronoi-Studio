import React from "react";

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
}

export default App;
