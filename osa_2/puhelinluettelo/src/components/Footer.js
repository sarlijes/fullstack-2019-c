import React from 'react';

const Footer = ({ footerName }) => {
  const footerStyle = {
    color: 'black',
    fontSize: 24
  }

  return (
    <div style={footerStyle}>
      <br />
      {footerName}
    </div>
  )
}

export default Footer;