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
        <div id="modal"></div>
        <Controller>
          <Scene duration={1000} triggerHook={0.1}pin={true}>
            <Timeline
              target={
                <p className="text-center mt-2 mb-3 mx-auto my-auto">
                  Voronoi Studio aims to visually dissect the disproportionate representation of male and western artists, compared to female and non-western artists. The Met’s digital collection contains over 375,000 pieces of artwork available through the Open Access program. We created two sets of contrasting art works to highlight the overt bias in the Met's Collection, one depicting women by women artists juxtaposed with nude paintings of women by male artists, while the other queried the Met's "highlighted" works and contrasted American pieces with pieces from underrepresented countries.
                  The art we are presenting comes in the form of live-motion voronoi diagrams, allowing us to present multiple views and elements from many different artworks. Voronoi diagrams are created by mapping the relationships between data, which seemed metaphoric for our demonstration.  In 2019, The Met was the 3rd most visited art museum in the world, with nearly 7,000,000 visitors annually, and was the most visited art museum in America. What responsibility does the most prominent art museum in the country have to highlight diverse and underrepresented artists and their cultures? How can we demand accountability from historically biased institutions, if we can't observe the current dismal state of affairs?
                </p>
              }
            >
              
              <Tween from={{ opacity: -1 }} to={{ opacity: 1 }} />
              </Timeline>
          </Scene>
          {/* CANVAS1 */}
          <Scene duration={"100%"} triggerHook={0.05} pin={true}>
          {(progress) => (
            <div>
            <Timeline totalProgress={progress} paused>   
            
              <h2 className="title text-center">Women by Women</h2>
              <canvas
                className="d-block my-auto mx-auto"
                id="canvas1"
                width="900"
                height="600"
              >
              </canvas>
             
            <Timeline target = { <h1 className="animate animation1">These 17 pieces are the only oil paintings available by women, featuring women via the MET API.<br/> <br/> 
Only 3 of these pieces are highlighted works</h1>}>

            <Tween
             from={{ opacity: -1}} to={{ opacity: 1}} />

             <Tween from={{ top: '15%'}} to={{ x: '0%', top: '90%' }} />

             <Tween
             from={{ opacity: 1}} to={{ opacity: -1}} />

             </Timeline>
             </Timeline>
             </div>
          )}
          </Scene>
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
            <Timeline
              target={
                <p className="text-center mt-2 mb-3 mx-auto my-auto">
                  This Voronoi consists of art by women with at least one woman subject. Originally, the plan was to only use works highlighted by The Met, but there were only 3. I decided to limit my selection to just oil paintings in order to create a cohesive look.
                </p>
              }
            >
              
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
              </Timeline>
          </Scene>
          {/* CANVAS2 */}
          <Scene duration={1000} pin={true} triggerHook={0.05}>
          {(progress) => (
            <div>
               <Timeline totalProgress={progress} paused>  
              <h2 className="title text-center">Women by Men</h2>
              <canvas
                className="d-block my-auto mx-auto"
                id="canvas2"
                width="900"
                height="600"
              ></canvas>

            <Timeline target = { <h1 className="animate animation2">There are no paintings of nude men painted by women available in the Met API.</h1>}>

            <Tween
             from={{ opacity: -1}} to={{ opacity: 1}} />

             <Tween from={{ top: '15%', x: '100%'}} to={{ x: '0%', top: '50%' }} />

             <Tween
             from={{ opacity: 1}} to={{ opacity: -1, x: '-100%'}} />

             </Timeline>
             </Timeline>
             </div>
          )}
          </Scene>
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
          <Timeline
              target={
            <p className="text-center mt-2 mb-3 mx-auto my-auto">
              Of the 14,350 artworks featured in the Modern and Contemporary Art Collection, 2,027 artworks are by women while 10,829 are by men. It’s hard to read those numbers without thinking of the question posed by the Guerrilla Girls 1989 piece, ‘Do Women Have To Be Naked To Get Into the Met Museum?” At the time of the creation less than 5% of the artists in the Modern Art Sections were women, while 85% of the nudes featured in the Met are of women.
            </p>
              }
              >
                <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
              </Timeline>
          </Scene>
           {/* CANVAS3 */}
          <Scene duration={1000} pin={true} triggerHook={0.05}>
          {(progress) => (
            <div>
               <Timeline totalProgress={progress} paused>  
                <h2 className="title text-center">Women by Men and Women</h2>
                <canvas
                className="d-block my-auto mx-auto"
                id="canvas3"
                width="900"
                height="600"
                ></canvas>
                <Timeline target = { <h1 className="animate animation3">In 2018, only 14.13% of the Met's 14,350 Modern and Contemporary Art pieces were by women artists.</h1>}>

                  {/* <Tween
                  from={{ opacity: -1}} to={{ opacity: 1}} /> */}

                  <Tween from={{ top: '50%', x: '200%'}} to={{ x: '-400%'}} />

                  {/* <Tween
                  from={{ opacity: 1}} to={{ opacity: -1}} /> */}

                </Timeline>
              </Timeline>
            </div>
          )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
          <Timeline
              target={
            <p className="text-center mx-auto my-auto">
              This voronoi combined all of the artwork from the previous two to show a more balanced view of artwork depicting women from both male and female artists.
            </p>
            }
            >
              
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
             </Timeline> 
          </Scene>
          {/* CANVAS4 */}
          <Scene duration={1000} pin={true} triggerHook={0.05}>
          {(progress) => (
            <div>
              <Timeline totalProgress={progress} paused>   
              <h2 className="title text-center">
                American Art Hightlighted at the Met
              </h2>
              <canvas
                className="d-block my-auto mx-auto"
                id="canvas4"
                width="900"
                height="600"
                >
              </canvas>
                <Timeline target = { <h1 className="animate animation4">In 2020, the Met hired it's first Native-American curator for the American Wing.</h1>}>

                    <Tween
                    from={{ opacity: -1}} to={{ opacity: 1}} />

                    <Tween from={{ top: '15%'}} to={{ top: '90%' }} />

                    <Tween
                    from={{ opacity: 1}} to={{ opacity: -1}} />

                  </Timeline>
                </Timeline>
                </div>
                )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
          <Timeline
              target={
            <p className="text-center mx-auto my-auto">
              We wanted to acknowledge the problematic Eurocentric lens that prominent institutions like the Metropolitan Museum present. The paintings included in this voronoi were the result of a simple query into the Met's highlighted works and contained the parameter "Location: New York." It yielded over 50 results, resulting in more complex voronoi than its underrepresented counterpart. Details that are noteworthy include the stark lack of people of color (BIPOC) as subjects, and the fact that only three paintings are by women artists (two of which are by the same woman).
            </p>
            }
            >
              
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
              </Timeline>
          </Scene>
           {/* CANVAS5 */}
          <Scene duration={1000} pin={true} triggerHook={0.05}>
          {(progress) => (
            <div>
               <Timeline totalProgress={progress} paused>  
                  <h2 className="title text-center">
                Highlighted Art from Underepresented Countries
                  </h2>
                  <canvas
                    className="d-block my-auto mx-auto"
                    id="canvas5"
                    width="900"
                    height="600"
                  ></canvas>
                    <Timeline target = { <h1 className="animate animation5">The Met has 107 pieces of highlighted work <br/>  from NY (population 19 million ), but <br/> only 177 from all of Africa (population 1.35 billion).
</h1>}>

                      <Tween
                      from={{ opacity: -1}} to={{ opacity: 1}} />

                      <Tween from={{ top: '15%', x: '-100%'}} to={{ x: '50%', top: '75%' }} />

                      <Tween
                      from={{ opacity: 1}} to={{ opacity: -1, x: '200%'}} />

                    </Timeline>
                </Timeline>
            </div>
            )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
          <Timeline
              target={
            <p className="text-center mx-auto my-auto">
              In stark contrast to the availability of work from American and major European countries, this piece shows art from countries with very limited highlighted work. Many countries have no available paintings in the Highlights section. While there are so many from New York, there are just 4 from India, 1 from Korea, 3 from Japan, to name only a few. There are 3 from all of Africa. These images all come from countries that are largely underrepresented in the chosen “highlights” of the Met, but also in the collection at large. Most are from Middle Eastern or Eastern countries.
            </p>
            }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>
           {/* CANVAS6 */}
          <Scene duration={1000} pin={true} triggerHook={0.05}>
          {(progress) => (
            <div>
               <Timeline totalProgress={progress} paused>  
                  <h2 className="title text-center">
                Highlighted Artwork From Around the World
                  </h2>
                  <canvas
                  className="d-block my-auto mx-auto"
                  id="canvas6"
                  width="900"
                  height="600"
                  ></canvas>
                  <Timeline target = { <h1 className="animate animation3">The Department the Arts of Africa, Oceania, and the Americas did not exist at the Met until 1969, when Nelson Rockefeller offered to gift over 3000 works from the Museum of Primitive Art</h1>}>
                    <Tween from={{ top: '50%', x: '200%'}} to={{ x: '-400%'}} />
                  </Timeline>
                </Timeline>
            </div>
          )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
          <Timeline
              target={
            <p className="text-center mx-auto my-auto">
              Following widespread criticism, in 2020, the Metropolitan Museum of Art delcared their intention to address racism and lack of diversity within their institution. They promised to "establish specified acquisition endowments with a total value of $10 million to increase the amount of works by BIPOC artists in our 20th- and 21st-century collections."  We anxiously await the opportunity to see the benefits of this push toward a more comprehensive collection and approach. 
            </p>
            }
            >
              <Tween from={{ opacity: -1 }} to={{ opacity: 1 }} />
              <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
            </Timeline>
          </Scene>
        </Controller>
        <div className="mx-auto mb-4 text-center">
          <a onClick={() => this.scrollToTop()}>Top</a>
        </div>
      </div>
    );
  }
}
export default App;
