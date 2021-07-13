import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import FeaturedPieces from "./components/FeaturedPieces";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import WomenByWomen from "./components/WomenByWomen";
import WomenByMen from "./components/WomenByMen";
import SingleVoronoi from "./components/SingleVoronoi";
// import FeaturedPieces from './components/FeaturedPieces'
// import VoronoiForm from './components/VoronoiForm'

/**
 * COMPONENT
 */
class Routes extends Component {
	render() {
		return (
			<div>
				{/* <Route path="/" component={Navbar} /> */}
				<Route exact path="/" component={Home} />
				<Route exact path="/main" component={App} />
				<Route
					exact
					path="/womenbywomen"
					render={(props) => (
						<SingleVoronoi voronoiId={1} title="Women by Women" />
					)}
				/>
				<Route exact path="/womenbymen" component={WomenByMen} />
				{/* <Route exact path="/featured-pieces" component={FeaturedPieces} />
        <Route exact path="/voronoi-form" component={VoronoiForm} /> */}
				<Route path="/all-art" component={FeaturedPieces} />
			</div>
		);
	}
}

export default withRouter(connect(null)(Routes));
