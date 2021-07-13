import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import FeaturedPieces from './components/FeaturedPieces'
import Home from './components/Home'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
      	<Route exact path="/main" component={App} />
        <Route path='/all-art' component={FeaturedPieces} />
      </div>
    )
  }
}

export default withRouter(connect(null)(Routes))