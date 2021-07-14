import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import FeaturedPieces from "./components/FeaturedPieces";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import WomenByWomen from "./components/WomenByWomen";
import WomenByMen from "./components/WomenByMen";
// import FeaturedPieces from './components/FeaturedPieces'
import VoronoiForm from "./components/VoronoiForm";
import SingleVoronoi from "./components/SingleVoronoi";

/**
 * COMPONENT
 */
class Routes extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/main" component={App} />
				<Route
					exact
					path="/womenbywomen"
					render={(props) => (
						<SingleVoronoi voronoiId="Women By Women" />
					)}
				/>
				<Route
					exact
					path="/womenbymen"
					render={(props) => (
						<SingleVoronoi voronoiId="Women by Men" />
					)}
				/>
				<Route
					exact
					path="/americanart"
					render={(props) => (
						<SingleVoronoi voronoiId="American Art" />
					)}
				/>
				<Route
					exact
					path="/nonwesternart"
					render={(props) => (
						<SingleVoronoi voronoiId="Non-Western Art" />
					)}
				/>
				<Route exact path="/voronoi-form" component={VoronoiForm} />
				<Route path="/all-art" component={FeaturedPieces} />
			</div>
		);
	}
}

export default withRouter(connect(null)(Routes));
