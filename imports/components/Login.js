import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import Header from './Header'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin (e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) this.setState({ error: err.reason })
      else this.setState({ error: '' })
    })
  }
  render () {
    return (
      <div>
        <Header />
        <div className='login'>
          <div className='login__box'>
            <form
              onSubmit={this.handleLogin}
              className='login__form'>
              <h2 className='login__form-title'>Login</h2>
              {this.state.error ? <p className='login__form--error'>{this.state.error}</p> : null}
              <input className='login__form-input' ref='email' type='email' placeholder='Email' />
              <input className='login__form-input' ref='password' type='password' placeholder='Password' />
              <button
                className='login__form-button'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
