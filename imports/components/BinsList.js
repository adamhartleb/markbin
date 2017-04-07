import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Bins } from '../api/bins'

import Header from './Header'
import Bin from './Bin'

class BinsList extends Component {
  constructor (props) {
    super(props)
    this.handleCreateBin = this.handleCreateBin.bind(this)
  }
  handleCreateBin () {
    Meteor.call('bins.insert')
  }
  render () {
    return (
      <div>
        <Header />
        <div className='bin-list'>
          <button
            onClick={this.handleCreateBin}
            className='bin__button create'>+ Create Bin</button>
          {this.props.listOfBins.map(bin => {
            return <Bin key={bin._id} {...bin} />
          })}
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('bins')
  return {
    listOfBins: Bins.find({}).fetch()
  }
}, BinsList)
