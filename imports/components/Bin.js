import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Link, browserHistory } from 'react-router'

const Bin = ({ _id, title, body, createdAt }) => {
  const removeBin = (id) => {
    Meteor.call('bins.remove', id)
  }
  return (
    <div className='bin-list__bin'>
      <div>
        <Link to={`/bins/${_id}`}><h3>{title}</h3></Link>
        <p>{createdAt}</p>
      </div>
      <div className='btn__flex'>
        <button
          onClick={() => browserHistory.push(`/bins/${_id}/edit`)}
          className='bin__button delete'>Edit</button>
        <button
          onClick={() => removeBin(_id)}
          className='bin__button delete'>Remove</button>
      </div>
    </div>
  )
}

export default Bin
