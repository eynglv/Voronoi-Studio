import React from "react";
import Navbar from "./components/Navbar";
import womenByWomen from "../script/artdata/womenByWomen";
import womenByMen from "../script/artdata/femaleNudesByMen";

import chart from "./components/pulsate";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";
import VoronoiForm from "./components/VoronoiForm";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  async componentDidMount() {
    const womenByMen = await this.getVoronoiPieces(2);
    const womenByWomen = await this.getVoronoiPieces(1);
    const americanHighlights = await this.getVoronoiPieces(3);
    const unusualHighlights = await this.getVoronoiPieces(4);
    this.setState({
      womenByMen: womenByMen,
      womenByWomen: womenByWomen,
      americanHighlights: americanHighlights,
      unusualHighlights: unusualHighlights,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.chartRender2 = chart.render(
        "#canvas2",
        500,
        800,
        this.state.womenByMen
      );
      this.chartRender1 = chart.render(
        "#canvas1",
        500,
        800,
        this.state.womenByWomen
      );
      this.chartRender3 = chart.render(
        "#canvas3",
        500,
        800,
        this.state.womenByWomen.concat(this.state.womenByMen)
      );
      this.chartRender4 = chart.render(
        "#canvas4",
        500,
        800,
        this.state.americanHighlights
      );
      this.chartRender5 = chart.render(
        "#canvas5",
        500,
        800,
        this.state.unusualHighlights
      );
      this.chartRender6 = chart.render(
        "#canvas6",
        500,
        960,
        this.state.americanHighlights.concat(this.state.unusualHighlights)
      );
      this.interval = setInterval(() => {
        this.chartRender1.next();
        this.chartRender2.next();
        this.chartRender3.next();
        this.chartRender4.next();
        this.chartRender5.next();
        this.chartRender6.next();
      }, 10);
    }
  }

  scrollToTop() {
    scroll.scrollToTop();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async getVoronoiPieces(id) {
    const art = await axios.get(`api/voronois/${id}`);
    return art.data;
  }
  render() {
    return (
      <div>
        <Navbar />
        <Controller>
          <Scene
            duration={1000}
            pin={true}
            // enabled={true}
            offset={210}
          >
            <div>
              <h2 className="title">Women by Women</h2>
              <canvas id="canvas1" width="960" height="500"></canvas>
            </div>
          </Scene>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>

          <Scene
            duration={1000}
            pin={true}
            // enabled={true}
            offset={210}
          >
            <div>
              <h2 className="title">Women by Men</h2>
              <canvas id="canvas2" width="960" height="500"></canvas>
            </div>
          </Scene>

          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.
          </p>

          <h2 className="title">Women by Men and Women</h2>
          <canvas id="canvas3" width="960" height="500"></canvas>
          <br />
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.
          </p>
          <h2 className="title">American Art hightlighted at the Met</h2>
          <canvas id="canvas4" width="960" height="500"></canvas>
          <br />
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.
          </p>
          <h2 className="title">
            Highlighted art from Underepresented Countries
          </h2>
          <canvas id="canvas5" width="960" height="500"></canvas>
          <br />
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.
          </p>
          <h2 className="title">Highlighted Artwork Combined</h2>
          <canvas id="canvas6" width="960" height="500"></canvas>
          <br />
        </Controller>
        <a onClick={() => this.scrollToTop()}>To the top!</a>
      </div>
    );
  }
}
export default App;
