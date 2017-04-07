import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Route, Router, browserHistory } from 'react-router'

import Login from '../imports/components/Login'
import BinsList from '../imports/components/BinsList'
import BinMain from '../imports/components/BinMain'
import BinMainEdit from '../imports/components/BinMainEdit'
import Register from '../imports/components/Register'

Tracker.autorun(() => {

})


const App = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Login} />
      <Route path='/signup' component={Register} />
      <Route path='/bins' component={BinsList} />
      <Route path='/bins/:id' component={BinMain} />
      <Route path='/bins/:id/edit' component={BinMainEdit} />
    </Router>
  )
}

Meteor.startup(() => {
  render(<App />, document.getElementById('root'))
})

