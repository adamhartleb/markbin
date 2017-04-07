import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router'

const Bin = ({ _id, title, body, createdAt }) => {
  const removeBin = (id) => {
    Meteor.call('bins.remove', id)
  }
  return (
    <div className='bin-list__bin'>
      <div>
        <Link to={`/bins/${_id}`}><h3>{title}</h3></Link>
        <p>{body}</p>
        <p>{createdAt}</p>
      </div>
      <button
        onClick={() => removeBin(_id)}
        className='bin__button delete'>Remove</button>
    </div>
  )
}

export default Bin
