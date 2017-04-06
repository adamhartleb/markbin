import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'

import Header from './Header'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleRegister (e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()
    const verifyPassword = this.refs.verifyPassword.value.trim()
    if (password.length < 6) return this.setState({ error: 'Password must be 6 or more characters' })
    if (password === verifyPassword) {
      Accounts.createUser({ email, password }, (err) => {
        if (err) this.setState({ error: err.reason })
        else this.setState({ error: '' })
      })
    } else {
      this.setState({ error: 'Passwords do not match' })
    }
  }
  render () {
    return (
      <div>
        <Header />
        <div className='login'>
          <div className='login__box'>
            <form
              onSubmit={this.handleRegister}
              className='login__form'>
              <h2 className='login__form-title'>Register</h2>
              {this.state.error ? <p className='login__form--error'>{this.state.error}</p> : null}
              <input className='login__form-input' ref='email' type='email' placeholder='Email' />
              <input className='login__form-input' ref='password' type='password' placeholder='Password' />
              <input className='login__form-input' ref='verifyPassword' type='password' placeholder='Verify Password' />
              <button
                className='login__form-button'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
