import React from "react";
import container from "./components/vornoi";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import chart from "./components/pulsate";
// import { d3 } from "d3";
// import { Delaunay } from "d3-delaunay";
// import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6%22";

class App extends React.Component {
  componentDidMount() {
    // container.render("#svg1", 200);
    chart.render("#container", 200, 950, 200);
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
