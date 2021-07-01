import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'


/**
 * COMPONENT
 */
class Routes extends Component {

  render() {

    return (
      <div>

      </div>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null)(Routes))


// {isLoggedIn ? (
//   <Switch>
//     <Route path="/home" component={Home} />
//     <Redirect to="/home" />
//   </Switch>
// ) : (
//   <Switch>
//     <Route path='/' exact component={ Login } />
//     <Route path="/login" component={Login} />
//     <Route path="/signup" component={Signup} />
//   </Switch>
// )}