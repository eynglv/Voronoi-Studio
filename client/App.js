import React from "react";
import chart from "./components/pulsate";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";

import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

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
      this.chartRender1 = chart.render("#canvas1", this.state.womenByWomen);
      this.chartRender2 = chart.render("#canvas2", this.state.womenByMen);
      this.chartRender3 = chart.render(
        "#canvas3",
        this.state.womenByWomen.concat(this.state.womenByMen)
      );
      this.chartRender4 = chart.render(
        "#canvas4",
        this.state.americanHighlights
      );
      this.chartRender5 = chart.render(
        "#canvas5",
        this.state.unusualHighlights
      );
      this.chartRender6 = chart.render(
        "#canvas6",
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
      <div id='main'>
        <Navbar />
        <div id='modal'></div>
        <Controller>
          <Scene duration={600} triggerHook={0.2} pin={true}>
            <Timeline target={<Intro />}>
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>
          <Scene
            duration={700}
            triggerHook={0.2}
            pin={(true, { pushfollowers: false })}
            enabled={true}
          >
            <div>
              <p className='text-paragraph mb-5 mx-5 my-auto'>
                Voronoi Studio aims to visually dissect the disproportionate
                representation of male and western artists, compared to female
                and non-western artists. The Met’s digital collection contains
                over 375,000 pieces of artwork available through the Open Access
                program. We created two sets of contrasting art works to
                highlight the overt bias in the Met's Collection, one depicting
                women by women artists juxtaposed with nude paintings of women
                by male artists, while the other queried the Met's "highlighted"
                works and contrasted American pieces with pieces from
                underrepresented countries.
              </p>
            </div>
          </Scene>
          <Scene
            duration={"100%"}
            triggerHook={0.25}
            pin={(true, { pushfollowers: false })}
            enabled={true}
          >
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto'>
                  The art we are presenting comes in the form of live-motion
                  voronoi diagrams, allowing us to present multiple views and
                  elements from many different artworks. Voronoi diagrams are
                  created by mapping the relationships between data, which was
                  fitting for our demonstration. In addition, we have included a
                  sprinkling of works from outside the Met's collection from
                  artists identified as female, non-binary, and from diverse
                  cultural backgrounds.
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>
          <Scene
            duration={"100%"}
            triggerHook={0.3}
            pin={(true, { pushfollowers: false })}
            enabled={true}
          >
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto'>
                  In 2019, The Met was the 3rd most visited art museum in the
                  world with nearly 7,000,000 visitors annually, and was the
                  most visited art museum in America. What responsibility does
                  the most prominent art museum in the country have to highlight
                  diverse and underrepresented artists and their cultures? How
                  can we demand accountability from historically biased
                  institutions, without observing the current dismal state of
                  affairs?
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>

          {/* CANVAS1 */}
          <Scene
            duration={"100%"}
            triggerHook={0.08}
            pin={(true, { pushfollowers: false })}
            enabled={true}
          >
            {(progress) => (
              <div>
                <Timeline totalProgress={progress} paused>
                  <h2 className='text-heading1 mb-4 display-5 text-center text-secondary-400/70'>
                    Women by Women
                  </h2>
                  <canvas
                    className='my-auto mx-auto'
                    id='canvas1'
                    width='900'
                    height='600'
                  ></canvas>
                  <Timeline
                    target={
                      <h1 className='fs-4 animate animation1'>
                        These 17 pieces are the only oil paintings available
                        tagged as depicting women by women artists via the MET
                        API.
                        <br /> <br />
                        Only 3 of these pieces are "highlighted" works
                      </h1>
                    }
                  >
                    <Tween
                      from={{ top: "110%", left: 60 }}
                      to={{ top: "-50%" }}
                    />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <Scene
            duration={"100%"}
            triggerHook={0.2}
            pin={(true, { pushfollowers: false })}
            enabled={true}
          >
            <Timeline
              target={
                <p className='text-paragraph mt-2 mb-2 mx-auto my-auto'>
                  The voronoi above consists of art by women with at least one
                  woman subject. We limited the selection to just oil paintings
                  in order to create a cohesive look. Originally, the plan was
                  to only use works "highlighted" by The Met, but there were
                  only 3. This piece presents the only ones available that fit
                  these criteria out of the entire collection.
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>

          {/*New Artist info*/}
          <Scene
            duration={"100%"}
            triggerHook={0.1}
            pin={(true, { pushfollowers: false })}
            enabled={true}
          >
            {(progress) => (
              <div className='mx-auto'>
                <Timeline totalProgress={progress} paused>
                  <Timeline
                    target={
                      <div className='d-flex ms-5 me-5 mx-auto'>
                        <img
                          className='w-50 p-2'
                          height='50%'
                          width='auto'
                          src='https://upload.wikimedia.org/wikipedia/commons/5/5c/Catharina_van_Hemessen_-_Portrait_of_a_Lady.jpg'
                        ></img>
                        <p
                          className='column p-3 my-auto text-paragraph align-self-center'
                          id='artist-description'
                        >
                          This piece is entitled Portrait of a Woman by{" "}
                          <a
                            style={{ color: "#a63d40" }}
                            href='https://en.wikipedia.org/wiki/Catharina_van_Hemessen'
                          >
                            Catharina van Hemessen
                          </a>{" "}
                          painted in the mid-1500s. She is widely credited with
                          with first self-portrait depicting an artist (of any
                          gender) working at an easel. Her work is not available
                          at the Met.
                        </p>
                      </div>
                    }
                  >
                    {/* <Tween from={{top: '20%', left: -2000 }} to={{left: 30}} />
                  <Tween from={{top: '20%'}} to={{top: '85%'}} />
                  <Tween from={{ opacity: 1}} to={{ opacity: -1}} /> */}
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <Scene duration={"100%"} triggerHook={0.15} pin={true}>
            {(progress) => (
              <div className='mx-auto'>
                <Timeline totalProgress={progress} paused>
                  <Timeline
                    target={
                      <div className='d-flex ms-5 me-5 mx-auto'>
                        <p className='column p-3 my-auto text-paragraph align-self-center'>
                          This painting, "afro died" was painted in 2011 by{" "}
                          <a
                            style={{ color: "#a63d40" }}
                            href='https://en.wikipedia.org/wiki/Iona_Rozeal_Brown'
                          >
                            Iona Rozeal Brown
                          </a>
                          . It is part of the National Gallery of Art
                          collection, but is not currently on view.
                        </p>
                        <img
                          className='w-50 p-2'
                          height='50%'
                          width='auto'
                          src='https://secureservercdn.net/160.153.138.53/6mj.cc8.myftpupload.com/wp-content/uploads/2020/06/Rozeal-.jpg'
                          width='400px'
                        ></img>
                      </div>
                    }
                  >
                    <Tween
                      from={{ top: "20%", left: -2000 }}
                      to={{ left: 30 }}
                    />
                    <Tween from={{ top: "20%" }} to={{ top: "85%" }} />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>

          {/* CANVAS2*/}
          <Scene duration={"100%"} pin={true} triggerHook={0.05}>
            {(progress) => (
              <div>
                <Timeline totalProgress={progress} paused>
                  <Tween>
                    <h2 className='title mb-4 pt-1 display-5 text-center'>
                      Women by Men
                    </h2>
                    <canvas
                      className='my-auto mx-auto'
                      id='canvas2'
                      width='900'
                      height='600'
                    ></canvas>
                  </Tween>

                  <Timeline
                    target={
                      <h1 className='animate animation2'>
                        There are no paintings of nude men painted by women
                        available in the Met API.
                      </h1>
                    }
                  >
                    <Tween
                      from={{ top: "25%", left: -800 }}
                      to={{
                        left: 800,
                        top: "25%",
                        ease: "Strong.easeOut",
                      }}
                    />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto'>
                  Of the 14,350 artworks featured in the Modern and Contemporary
                  Art Collection, 2,027 artworks are by women while 10,829 are
                  by men. It’s hard to read those numbers without thinking of
                  the question posed by the Guerrilla Girls 1989 piece, ‘Do
                  Women Have To Be Naked To Get Into the Met Museum?” At the
                  time of the creation less than 5% of the artists in the Modern
                  Art Sections were women, while 85% of the nudes featured in
                  the Met are of women.
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>

          {/*New Artist info*/}
          <Scene duration={"100%"} triggerHook={0.15} pin={true}>
            {(progress) => (
              <div className='mx-auto'>
                <Timeline totalProgress={progress} paused>
                  <Timeline
                    target={
                      <div className='d-flex ms-5 me-5 mx-auto'>
                        <img
                          className='w-50 p-2'
                          height='50%'
                          width='auto'
                          src='https://cdn.shopify.com/s/files/1/0585/0461/files/fullsizeoutput_31fa_2048x2048.jpeg?v=1561381118'
                          height='600px'
                        ></img>
                        <p
                          className='p-3 my-auto text-paragraph align-self-center'
                          id='artist-description'
                        >
                          <a
                            style={{ color: "#a63d40" }}
                            href='https://janeclatworthy.com/'
                          >
                            Jane Clatworthy
                          </a>{" "}
                          is a contemporary artist based in London. She paints
                          nudes of men as she strives "to address the imbalance
                          we see across gallery walls. If men can paint women,
                          why not the other way around?"
                        </p>
                      </div>
                    }
                  >
                    <Tween
                      from={{ top: "20%", left: -2000 }}
                      to={{ left: 30 }}
                    />
                    <Tween from={{ top: "20%" }} to={{ top: "85%" }} />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>

          {/* CANVAS3 */}
          <Scene duration={"100%"} pin={true} triggerHook={0.05}>
            {(progress) => (
              <div>
                <Timeline totalProgress={progress} paused>
                  <Tween>
                    <h2 className='title mb-4 display-5 text-center'>
                      Women by Men and Women
                    </h2>
                    <canvas
                      className='my-auto mx-auto'
                      id='canvas3'
                      width='900'
                      height='600'
                    ></canvas>
                  </Tween>
                  <Timeline
                    target={
                      <h1 className='text-paragraph animate animation3'>
                        In 2018, only 14.13% of the Met's 14,350 Modern and
                        Contemporary Art pieces were by women artists.
                      </h1>
                    }
                  >
                    <Tween
                      from={{ top: "50%", left: -500 }}
                      to={{ left: 500 }}
                    />

                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto'>
                  In combining all of the artwork from the previous two voronois
                  into one larger piece, we envision a more balanced view of
                  artwork that depicts women from both male and female artist
                  perspectives.
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>

          {/*New Artist info*/}
          <Scene duration={"100%"} triggerHook={0.15} pin={true}>
            {(progress) => (
              <div className='mx-auto'>
                <Timeline totalProgress={progress} paused>
                  <Timeline
                    target={
                      <div className='d-flex ms-5 me-5 mx-auto'>
                        <img
                          className='p-2'
                          height='50%'
                          width='auto'
                          src='https://images.squarespace-cdn.com/content/v1/5b0fd1ca31d4df1c5e5588b2/1598099279839-
RM2YQGZ0TBN0CXC3BQJU/GayatriFinal.jpg?format=750w'
                          height='500px'
                        ></img>
                        <p
                          className='p-3 my-auto text-paragraph align-self-center'
                          id='artist-description'
                        >
                          Non-binary artists are scarcely represented in museum
                          walls.{" "}
                          <a
                            style={{ color: "#a63d40" }}
                            href='https://www.instagram.com/shivaraichandani/?hl=en'
                          >
                            Shiva Raichandani
                          </a>{" "}
                          is a contemporary artist helping to promote
                          gender-diverse representation in art through their
                          work.
                        </p>
                      </div>
                    }
                  >
                    <Tween
                      from={{ top: "20%", left: -2000 }}
                      to={{ left: 30 }}
                    />
                    <Tween from={{ top: "20%" }} to={{ top: "85%" }} />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>

          {/* CANVAS4 */}
          <Scene duration={"100%"} pin={true} triggerHook={0.05}>
            {(progress) => (
              <div>
                <Timeline totalProgress={progress} paused>
                  <h2 className='title mb-4 display-5 text-center'>
                    American Art Hightlighted at the Met
                  </h2>
                  <canvas
                    className='my-auto mx-auto'
                    id='canvas4'
                    width='900'
                    height='600'
                  ></canvas>
                  <Timeline
                    target={
                      <h1 className='animate animation4'>
                        In 2020, the Met hired it's first Native-American
                        curator for the American Wing.
                      </h1>
                    }
                  >
                    <Tween
                      from={{ top: "15%", left: -2000 }}
                      to={{ top: "15%", left: 60 }}
                    />

                    <Tween from={{ top: "15%" }} to={{ top: "80%" }} />

                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto '>
                  We wanted to acknowledge the problematic Eurocentric lens that
                  prominent institutions like the Metropolitan Museum present.
                  The paintings included in this last voronoi were the result of
                  a simple query into the Met's "Highlighted" works and
                  contained the parameter "Location: New York." It yielded over
                  50 results, resulting in a more complex voronoi than its
                  underrepresented counterpart. Details that are noteworthy are
                  the stark lack of Black, Indigenous, people of color (BIPOC)
                  as subjects, and the fact that only three paintings are by
                  Women artists (two of which are by the same artist).
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>

          <Scene duration={"100%"} triggerHook={0.15} pin={true}>
            {(progress) => (
              <div className='mx-auto'>
                <Timeline totalProgress={progress} paused>
                  <Timeline
                    target={
                      <div className='d-flex ms-5 me-5 mx-auto'>
                        <p
                          className='p-3 my-auto text-paragraph align-self-center'
                          id='artist-description'
                        >
                          <a
                            style={{ color: "#a63d40" }}
                            href='https://en.wikipedia.org/wiki/Wangechi_Mutu'
                          >
                            Wangechi Mutu
                          </a>{" "}
                          is a Kenyan-born, Brooklyn-based contemporary artist.
                          This piece was produced in 2009 and titled Cactus
                          Green Nips. Mutu's sculpture work was actually
                          featured at the Met in 2019 as part of their new
                          annual Facade Commission.
                        </p>
                        <img
                          className='w-50 p-2'
                          height='50%'
                          width='auto'
                          src='https://blog.artsper.com/wp-content/uploads/2018/11/Wangechi-Mutu-3.jpg'
                          height='350px'
                        ></img>
                      </div>
                    }
                  >
                    <Tween
                      from={{ top: "20%", left: -2000 }}
                      to={{ left: 30 }}
                    />
                    <Tween from={{ top: "20%" }} to={{ top: "85%" }} />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>

          {/* CANVAS5 */}
          <Scene duration={1000} pin={true} triggerHook={0.05}>
            {(progress) => (
              <div>
                <Timeline totalProgress={progress} paused>
                  <h2 className='title mb-4 display-6 text-center'>
                    Highlighted Art from Underrepresented Countries
                  </h2>
                  <canvas
                    className='my-auto mx-auto'
                    id='canvas5'
                    width='900'
                    height='600'
                  ></canvas>
                  <Timeline
                    target={
                      <h1 className='text-paragraph animate animation5'>
                        The Met has 107 pieces of highlighted work from NY
                        (population 19 million ), but only 177 from all of
                        Africa (population 1.35 billion).
                      </h1>
                    }
                  >
                    <Tween
                      from={{ top: "60%", left: -2000 }}
                      to={{ top: "60%", left: 700 }}
                    />
                    <Tween from={{ opacity: 1 }} to={{ opacity: -1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <br />
          <Scene duration={"100%"} triggerHook={0.2} pin={true}>
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto'>
                  In stark contrast to the availability of work from American
                  and major European countries, this last piece shows art from
                  countries with very limited highlighted work. Many countries
                  have no available paintings in the "highlights" section. While
                  there are so many from New York, there are just 4 from India,
                  1 from Korea, and 3 from Japan, to name only a few. There are
                  3 from all of Africa. These images all come from countries
                  that are largely underrepresented in the chosen “highlights”
                  of the Met, but also in the collection at large. Most are from
                  Middle Eastern or Eastern countries.
                </p>
              }
            >
              <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
            </Timeline>
          </Scene>

          {/* CANVAS6 */}
          <Scene duration={"100%"} pin={true} triggerHook={0.05}>
            {(progress) => (
              <div>
                <Timeline totalProgress={progress} paused>
                  <h2 className='title mb-4 display-5 text-center'>
                    Highlighted Artwork From Around the World
                  </h2>
                  <canvas
                    className='my-auto mx-auto'
                    id='canvas6'
                    width='900'
                    height='600'
                  ></canvas>
                  <Timeline
                    target={
                      <h1 className='animate animation3'>
                        The Department of the Arts of Africa, Oceania, and the
                        Americas did not exist at the Met until 1969, when
                        Nelson Rockefeller offered to gift over 3000 works from
                        the Museum of Primitive Art.
                      </h1>
                    }
                  >
                    <Tween
                      from={{ top: "50%", right: 500 }}
                      to={{ right: 0 }}
                    />
                    <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
                  </Timeline>
                </Timeline>
              </div>
            )}
          </Scene>
          <br />
          <Scene duration={"100%"} pin={true} offset={200}>
            <Timeline
              target={
                <p className='text-paragraph mb-5 mx-5 my-auto'>
                  Following widespread criticism, in 2020, the Metropolitan
                  Museum of Art declared their intention to address racism and
                  lack of diversity within their institution. They promised to
                  "establish specified acquisition endowments with a total value
                  of $10 million to increase the amount of works by BIPOC
                  artists in our 20th- and 21st-century collections." We
                  anxiously await the opportunity to see the benefits of this
                  push toward a more comprehensive collection and approach.
                </p>
              }
            >
              <Tween
                from={{ opacity: -1 }}
                to={{ opacity: 2, ease: "Strong.easeOut" }}
              />
            </Timeline>
          </Scene>
        </Controller>
        <div className='mx-auto mb-5 display-6 text-center'>
          <a onClick={() => this.scrollToTop()} className='scrollToTop'>
            Scroll To Top
          </a>
        </div>
      </div>
    );
  }
}

export default App;
