import React from "react";

const RemovePerson = ({ id, name, removePerson }) => {
  return <button onClick={() => removePerson({ id, name })}>poista</button>
}

export default RemovePerson;