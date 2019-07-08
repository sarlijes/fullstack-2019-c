// import React from 'react'
// import { newFilter, emptyFilter } from '../reducers/filterReducer';

// const Filter = (props) => {
//   const handleChange = (event) => {
//     props.store.dispatch(newFilter(event.target.value))
//   }
//   const style = {
//     marginBottom: 10
//   }

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//       <button onClick={() => 
//         props.store.dispatch(emptyFilter())}>empty filter</button>
//     </div>
//   )
// }

// export default Filter

import React from 'react'
import { updateFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    store.dispatch(updateFilter(event.target.value))
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter