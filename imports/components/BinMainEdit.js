import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Bins } from '../api/bins'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/markdown/markdown'

import Header from './Header'

class BinMainEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      body: '',
      title: ''
    }
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }
  handleEditorChange (e) {
    let body = e
    this.setState({ body })
    Meteor.call('bins.update', this.props.params.id, body)
  }
  render () {
    if (this.props.bin.length === 0) return <Header />
    return (
      <div>
        <Header />
        <div className='bin-list'>
          <div className='codemirror'>
            <CodeMirror
              value={this.props.bin[0].body}
              onChange={this.handleEditorChange}
              options={{ mode: 'markdown', lineNumbers: true }} />
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer(props => {
  Meteor.subscribe('canSee', props.params.id)

  return {
    bin: Bins.find({ _id: props.params.id }).fetch()
  }
}, BinMainEdit)
