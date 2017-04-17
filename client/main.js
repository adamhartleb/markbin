import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { Route, Router, browserHistory } from 'react-router'

import Login from '../imports/components/Login'
import BinsList from '../imports/components/BinsList'
import BinMain from '../imports/components/BinMain'
import BinMainEdit from '../imports/components/BinMainEdit'
import Register from '../imports/components/Register'

const onAuthChange = (isAuthenticated, privacy) => {
  if (privacy === 'no' && isAuthenticated) {
    browserHistory.replace('/bins')
  } else if (privacy === 'yes' && !isAuthenticated) {
    browserHistory.replace('/')
  }
}

const globalOnChange = (prevPage, { routes }) => {
  globalOnEnter({ routes })
}
const globalOnEnter = ({ routes }) => {
  Session.set('pagePrivacy', routes[routes.length - 1].privacy)
}

const onEnterNote = (nextPage) => {
  Session.set('selectedNoteId', nextPage.params.id)
}
const onLeaveNote = (nextPage) => {
  Session.set('selectedNoteId', undefined)
}

Tracker.autorun(() => {
  let privacy = Session.get('pagePrivacy')
  let isAuthenticated = Meteor.userId()
  onAuthChange(isAuthenticated, privacy)
})

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route onEnter={globalOnEnter} onChange={globalOnChange}>
        <Route path='/' component={Login} privacy='no' />
        <Route path='/signup' component={Register} privacy='no' />
        <Route path='/bins' component={BinsList} privacy='yes' />
        <Route path='/bins/:id' component={BinMain} />
        <Route path='/bins/:id/edit' component={BinMainEdit} privacy='yes' />
      </Route>
    </Router>
  )
}

Meteor.startup(() => {
  render(<App />, document.getElementById('root'))
})

