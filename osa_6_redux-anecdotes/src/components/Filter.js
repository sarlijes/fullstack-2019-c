import React from 'react'
import { connect } from 'react-redux'
import { newFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    props.store.dispatch(newFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter