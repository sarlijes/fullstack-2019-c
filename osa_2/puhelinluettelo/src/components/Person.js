import React from 'react';
import RemovePerson from './RemovePerson';

const Person = ({ id, name, number, removePerson }) =>
  <div>
    <li className='person'>
      {name}
      {number}
      <RemovePerson id={id} name={name} removePerson={removePerson} />
    </li>
  </div>

export default Person;