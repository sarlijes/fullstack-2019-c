import React from 'react';

const AddForm = ({
  addPerson,
  newName,
  newNumber,
  nameChange,
  numberChange }) => (

    <form onSubmit={addPerson} name={newName}>
      <div>
        nimi: <input value={newName} onChange={nameChange} />
      </div>
      <div>
        numero: <input value={newNumber} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );

export default AddForm;