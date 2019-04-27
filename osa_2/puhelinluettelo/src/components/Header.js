import React from 'react';

const Header = ({ headerName }) => {
  const headerStyle = {
    color: 'black',
    fontSize: 32
  }

  return (
    <div style={headerStyle}>
      <br />
      {headerName}
    </div>
  )
}

export default Header;