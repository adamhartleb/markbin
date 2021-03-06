import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Bins } from '../api/bins'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'

import Header from './Header'

class BinMain extends Component {
  render () {
    const { bin } = this.props
    if (bin.length === 0) return <Header />
    return (
      <div>
        <Header />
        <div className='bin-list'>
          <h1>{bin[0].title}</h1>
          <h3>{bin[0].createdAt}</h3>
          <div className='codemirror'>
            <CodeMirror
              value={this.props.bin[0].body}
              options={{ mode: 'javascript', lineNumbers: true, readOnly: true }} />
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
}, BinMain)

