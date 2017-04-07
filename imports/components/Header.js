import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import { Link } from 'react-router'

class Header extends Component {
  handleLogout () {
    Accounts.logout()
  }
  renderLoginLogout () {
    if (this.props.userId) {
      return (
        <div>
          <button
            onClick={this.handleLogout.bind(this)}
            className='header__nav-button'>Logout</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/'>
            <button className='header__nav-button'>Login</button>
          </Link>
          <span> / </span>
          <Link to='/signup'>
            <button className='header__nav-button'>Sign Up</button>
          </Link>
        </div>
      )
    }
  }
  render () {
    return (
      <div className='header'>
        <div className='header__nav'>
          <h1>CodeShare</h1>
          {this.renderLoginLogout()}
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    userId: Meteor.userId()
  }
}, Header)
