import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import FeaturedPieces from "./components/FeaturedPieces";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

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
						<SingleVoronoi
							voronoiId="Women By Women"
							curator="Josephine Bartholoma"
						/>
					)}
				/>
				<Route
					exact
					path="/womenbymen"
					render={(props) => (
						<SingleVoronoi
							voronoiId="Women By Men"
							curator="Phoebe Torchia"
						/>
					)}
				/>
				<Route
					exact
					path="/highlighted-american"
					render={(props) => (
						<SingleVoronoi
							voronoiId="American Art"
							curator="Elvy Yang"
						/>
					)}
				/>
				<Route
					exact
					path="/highlighted-underrepresented"
					render={(props) => (
						<SingleVoronoi
							voronoiId="Non-Western Art"
							curator="Adrienne Scutellaro"
						/>
					)}
				/>
				<Route exact path="/voronoi-form" component={VoronoiForm} />
				<Route path="/all" component={FeaturedPieces} />
			</div>
		);
	}

}

export default withRouter(connect(null)(Routes));
