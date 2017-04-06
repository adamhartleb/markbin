import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'

import Login from '../imports/components/Login'

const App = () => {
  return (
    <Login />
  )
}

Meteor.startup(() => {
  render(<App />, document.getElementById('root'))
})

