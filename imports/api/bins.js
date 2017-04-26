import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import moment from 'moment'

export const Bins = new Mongo.Collection('bins')

if (Meteor.isServer) {
  Meteor.publish('bins', function () {
    return Bins.find({ userId: this.userId })
  })
  Meteor.publish('canSee', function (thisBin) {
    return Bins.find({ _id: thisBin })
  })
  Meteor.publish('canSeeEdit', function (thisBin) {
    return Bins.find({ _id: thisBin, userId: this.userId })
  })
}

Meteor.methods({
  'bins.insert' () {
    if (!this.userId) throw new Meteor.Error('Not Authorized')

    Bins.insert({
      body: '',
      title: 'Untitled',
      userId: this.userId,
      createdAt: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      updatedAt: 0
    })
  },
  'bins.remove' (_id) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')

    Bins.remove({
      _id,
      userId: this.userId
    })
  },
  'bins.update' (_id, body) {
    if (!this.userId) throw new Meteor.Error('Not Authorized')

    Bins.update({ _id }, {
      $set: {
        updatedAt: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        body
      }
    })
  }
})
