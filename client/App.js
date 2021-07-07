import React from "react";
import container from "./components/vornoi";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

import chart from "./components/pulsate";

// import * as Scroll from 'react-scroll';
import { animateScroll as scroll } from "react-scroll";
// import { d3 } from "d3";
// import { Delaunay } from "d3-delaunay";
// import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6%22";

class App extends React.Component {
	constructor() {
		super();
		this.scrollToTop = this.scrollToTop.bind(this);
		this.chartRender1 = chart.render("#canvas1", 500, 960, 30);
		this.chartRender2 = chart.render("#canvas2", 500, 960, 30);
		this.state = { toggle: false };
	}

	componentDidMount() {
		// container.render("#svg1", 10);
		// container.render("#svg2", 20);
		// container.render("#svg3", 15);
		// chart.generator("#canvas1", 500, 960, 30)

		this.interval = setInterval(() => {
			this.chartRender1.next();
			this.chartRender2.next();
		}, 10);
	}
	componentDidUpdate() {
		this.chartRender.next();
	}
	scrollToTop() {
		scroll.scrollToTop();
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<div>
				<Navbar />
				<Routes />
				<canvas id="canvas1" width="960" height="500"></canvas>
				<canvas id="canvas2" width="960" height="500"></canvas>
				<svg id="svg1" width="960" height="500"></svg>
				<p>
					Sed ut perspiciatis unde omnis iste natus error sit
					voluptatem accusantium doloremque laudantium, totam rem
					aperiam, eaque ipsa quae ab illo inventore veritatis et
					quasi architecto beatae vitae dicta sunt explicabo. Nemo
					enim ipsam voluptatem quia voluptas sit aspernatur aut odit
					aut fugit, sed quia consequuntur magni dolores eos qui
					ratione voluptatem sequi nesciunt. Neque porro quisquam est,
					qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
					velit, sed quia non numquam eius modi tempora incidunt ut
					labore et dolore magnam aliquam quaerat voluptatem. Ut enim
					ad minima veniam, quis nostrum exercitationem ullam corporis
					suscipit laboriosam, nisi ut aliquid ex ea commodi
					consequatur? Quis autem vel eum iure reprehenderit qui in ea
					voluptate velit esse quam nihil molestiae consequatur, vel
					illum qui dolorem eum fugiat quo voluptas nulla pariatur?
				</p>
				<svg id="svg2" width="960" height="500"></svg>
				<p>
					At vero eos et accusamus et iusto odio dignissimos ducimus
					qui blanditiis praesentium voluptatum deleniti atque
					corrupti quos dolores et quas molestias excepturi sint
					occaecati cupiditate non provident, similique sunt in culpa
					qui officia deserunt mollitia animi, id est laborum et
					dolorum fuga. Et harum quidem rerum facilis est et expedita
					distinctio. Nam libero tempore, cum soluta nobis est
					eligendi optio cumque nihil impedit quo minus id quod maxime
					placeat facere possimus, omnis voluptas assumenda est, omnis
					dolor repellendus. Temporibus autem quibusdam et aut
					officiis debitis aut rerum necessitatibus saepe eveniet ut
					et voluptates repudiandae sint et molestiae non recusandae.
					Itaque earum rerum hic tenetur a sapiente delectus, ut aut
					reiciendis voluptatibus maiores alias consequatur aut
					perferendis doloribus asperiores repellat.
				</p>
				<svg id="svg3" width="960" height="500"></svg>
				<br />
				<a onClick={() => this.scrollToTop()}>To the top!</a>
			</div>
		);
	}
}

export default App;
