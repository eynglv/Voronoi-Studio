import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import FeaturedPieces from './components/FeaturedPieces';
import Home from './components/Home';
import Navbar from './components/Navbar';
import WorksCited from './components/WorksCited';

// import FeaturedPieces from './components/FeaturedPieces'
import VoronoiForm from './components/VoronoiForm';
import SingleVoronoi from './components/SingleVoronoi';

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/main' component={App} />
        <Route
          exact
          path='/womenbywomen'
          render={(props) => (
            <SingleVoronoi
              voronoiId='Women By Women'
              curator='Josephine Bartholoma'
              links={[
                'https://artsandculture.google.com/story/the-women-painters-overlooked-by-art-history/7AJCHFiEkqVKJg',
                'https://www.dailyartmagazine.com/10-female-artist-forgotten-art-history',
              ]}
              titles={[
                'The Women Painters Overlooked By Art History',
                '10 Female Artists Forgotten By Art History',
              ]}
            />
          )}
        />
        <Route
          exact
          path='/womenbymen'
          render={(props) => (
            <SingleVoronoi
              voronoiId='Women By Men'
              curator='Phoebe Torchia'
              links={['https://www.instagram.com/changethemuseum/?hl=en']}
              titles={['Change The Museums Instagram']}
            />
          )}
        />
        <Route
          exact
          path='/highlighted-american'
          render={(props) => (
            <SingleVoronoi
              voronoiId='American Art'
              curator='Elvy Yang'
              links={[
                'https://www.sacredartsresearch.org/blog/2018/2/23/10-native-american-painters-schools-and-styles-you-should-know',
                'https://www.artsy.net/article/artsy-editorial-influential-living-african-american-artists',
              ]}
              titles={[
                '10 NATIVE AMERICAN PAINTERS, SCHOOLS AND STYLES YOU SHOULD KNOW',
                'The Most Influential Living African American Artists',
              ]}
            />
          )}
        />
        <Route
          exact
          path='/highlighted-underrepresented'
          render={(props) => (
            <SingleVoronoi
              voronoiId='Non-Western Art'
              curator='Adrienne Scutellaro'
              links={[
                'https://blog.artsper.com/en/a-closer-look/10-african-artists-you-absolutely-must-know/',
                'https://theculturetrip.com/asia/articles/10-non-western-contemporary-artists-you-should-know/',
              ]}
              titles={[
                '10 African Artists You Should Absolutely Know',
                '10 Non-Western Contemporary Artists You Should Know',
              ]}
            />
          )}
        />
        <Route exact path='/voronoi-form' component={VoronoiForm} />
        <Route path='/all' component={FeaturedPieces} />
        <Route path='/works-cited' component={WorksCited} />
      </div>
    );
  }
}

export default withRouter(connect(null)(Routes));
