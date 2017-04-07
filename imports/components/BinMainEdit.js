import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/markdown/markdown'

import Header from './Header'

export default class BinMainEdit extends Component {
  render () {
    return (
      <div>
        <Header />
        <div className='bin-list'>
          <div className='codemirror'>
            <CodeMirror options={{ mode: 'markdown', lineNumbers: true }} />
          </div>
        </div>
      </div>
    )
  }
}
