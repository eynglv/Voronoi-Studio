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
    const womenByMen = await this.getVoronoiPieces("Women By Men");
    const womenByWomen = await this.getVoronoiPieces("Women By Women");
    const americanHighlights = await this.getVoronoiPieces("American Art");
    const unusualHighlights = await this.getVoronoiPieces("Non-Western Art");
    this.setState({
      womenByMen: womenByMen,
      womenByWomen: womenByWomen,
      americanHighlights: americanHighlights,
      unusualHighlights: unusualHighlights,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.chartRender1 = chart.render(
        "#canvas1",
        600,
        900,
        this.state.womenByWomen
      );
      this.chartRender2 = chart.render(
        "#canvas2",
        600,
        900,
        this.state.womenByMen
      );
      this.chartRender3 = chart.render(
        "#canvas3",
        600,
        900,
        this.state.womenByWomen.concat(this.state.womenByMen)
      );
      this.chartRender4 = chart.render(
        "#canvas4",
        600,
        900,
        this.state.americanHighlights
      );
      this.chartRender5 = chart.render(
        "#canvas5",
        600,
        900,
        this.state.unusualHighlights
      );
      this.chartRender6 = chart.render(
        "#canvas6",
        600,
        900,
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

  async getVoronoiPieces(title) {
    const art = await axios.get(`api/voronois/${title}`);
    return art.data;
  }
  render() {
    return (
      <div>
        <Navbar />
        <Controller>
          <Scene
       duration={'100%'} triggerHook={0.05} pin={true}
          >
            <div>
              <h2 className="title text-center">Women by Women</h2>
              <canvas className= "d-block my-auto mx-auto" id="canvas1" width="900" height="600"></canvas>
              </div>
              </Scene>
              <Scene
    duration={'100%'} triggerHook={.20} pin={true}
          >  
           <Timeline target = {   <p className ="text-center mx-auto my-auto">
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
           }>
             <Tween
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}
                  />
                  {/* <Tween
                    to={{ x: '110%' }}
                  /> */}
             </Timeline> 
             {/* <Timeline target = {
             <p>hi</p>}
             >
             <Tween 
             from = {{ x:'0%'}}
             to = {{ x: '100%'}}
             />
             </Timeline> */}
            </Scene>
          <Scene
            duration={1000}
            pin={true}
            triggerHook={0.05}
          >
            <div>
              <h2 className="title text-center">Women by Men</h2>
              <canvas className = "d-block my-auto mx-auto" id="canvas2" width="900" height="600"></canvas>
            </div>
          </Scene>
          <Scene
            duration={'100%'} triggerHook={.20} pin={true}
          >
          <p className ="text-center mx-auto my-auto">
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
          </Scene>
          <Scene
       duration={1000}
       pin={true}
       triggerHook={0.05}
          >
            <div>
          <h2 className="title text-center">Women by Men and Women</h2>
          <canvas className ="d-block my-auto mx-auto" id="canvas3" width="900" height="600"></canvas>
          </div>
          </Scene>
          <br />
          <Scene
    duration={'100%'} triggerHook={.20} pin={true}
          >
          <p className ="text-center mx-auto my-auto">
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
          </Scene>
          <Scene
       duration={1000}
       pin={true}
       triggerHook={0.05}
          >
            <div>
          <h2 className="title text-center">American Art hightlighted at the Met</h2>
          <canvas className = "d-block my-auto mx-auto" id="canvas4" width="900" height="600"></canvas>
          </div>
          </Scene>
          <br />
          <Scene
     duration={'100%'} triggerHook={.20} pin={true}
          >
          <p className ="text-center mx-auto my-auto">
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
          </Scene>
          <Scene
       duration={1000}
       pin={true}
       triggerHook={0.05}
          >
            <div>
          <h2 className="title text-center">
            Highlighted art from Underepresented Countries
          </h2>
          <canvas className = "d-block my-auto mx-auto" id="canvas5" width="900" height="600"></canvas>
          </div>
          </Scene>
          <br />
          <Scene
    duration={'100%'} triggerHook={.20} pin={true}
          >
          <p className ="text-center mx-auto my-auto">
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
          </Scene>
          <Scene
       duration={1000}
       pin={true}
       triggerHook={0.05}
          >
            <div>
          <h2 className="title text-center">Highlighted Artwork Combined</h2>
          <canvas className = "d-block my-auto mx-auto" id="canvas6" width="900" height="600"></canvas>
          </div>
          </Scene>
          <br />
        </Controller>
        <div className="mx-auto mb-4 text-center" >
        <a onClick={() => this.scrollToTop()}>Top</a>
        </div>
      </div>
    );
  }
}
export default App;
