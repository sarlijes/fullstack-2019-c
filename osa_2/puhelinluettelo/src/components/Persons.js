import React from 'react'
import Person from './Person'

const Persons = ({ persons, removePerson, changeNumber }) => {
  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          removePerson={removePerson}
          changeNumber={changeNumber}
        />)}
    </div>
  )
};

export default Persons;