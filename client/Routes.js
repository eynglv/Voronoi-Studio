import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";

import App from "./App";
import FeaturedPieces from "./components/FeaturedPieces";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import WorksCited from "./components/WorksCited";
import VoronoiForm from "./components/VoronoiForm";

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/main' component={App} />
        <Route exact path='/voronoi-form' component={VoronoiForm} />
        <Route path='/all' component={FeaturedPieces} />
        <Route path='/works-cited' component={WorksCited} />
      </div>
    );
  }
}

export default withRouter(connect(null)(Routes));
