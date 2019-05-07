import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import personService from './services/persons';
import Notification from './components/Notification';
import ErrorMsg from './components/ErrorMsg';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filteredList, setFilteredList] = useState(persons);
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setFilteredList(initialPersons);
      });
  }, []);

  useEffect(() => {
    console.log('', persons);
  }, [persons])

  const nameChange = event => { setNewName(event.target.value) };
  const numberChange = event => { setNewNumber(event.target.value) };

  const handleFilter = event => {
    setNewFilter(event.target.value);
    setFilteredList(
      persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;

    if (persons.map(person => person.name).includes(name)) {
      if (window.confirm(`${name} on jo luettelossa, korvataanko nykyinen numero uudella?`)) {
        const id = persons.filter(person => person.name === name)[0].id;
        const personObject = {
          id: id,
          name: name,
          number: number
        };
        personService
          .update(id, personObject)
          .then(updatePerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatePerson));
            setFilteredList(persons.map(person => person.id !== id ? person : updatePerson));
            setNewFilter('');
            setNotificationMessage(`Muutettiin henkilön ${name} puh. numero`)
            setTimeout(() => { setNotificationMessage(null) }, 4000);
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)
            setTimeout(() => { setErrorMessage(null) }, 4000);
          });
      }
      setNewName('');
      setNewNumber('');
    } else {
      const personObject = { name, number };
      personService
        .create(personObject)
        .then(returnedPerson => {
          setFilteredList(persons.concat(returnedPerson));
          setPersons(persons.concat(returnedPerson));
          // console.log('-->', filteredList)
          setNotificationMessage(`Lisättiin henkilön ${name} puhelinnumero`)
          setTimeout(() => { setNotificationMessage(null) }, 4000)
        }).catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => { setErrorMessage(null) }, 4000);
        })
      setNewName('')
      setNewNumber('')
    }
  };

  const removePerson = ({ id, name }) => {
    if (window.confirm(`Poistetaanko ${name} luettelosta`)) {
      personService
        .remove(id)
        .then(response => {
          setNotificationMessage(`${name} poistettiin luettelosta`)
          setTimeout(() => { setNotificationMessage(null) }, 4000);
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => { setErrorMessage(null) }, 4000);
        })
      setFilteredList(filteredList.filter(person => person.id !== id))
      setPersons(persons.filter(person => person.id !== id));
    }
  };


  return (
    <div className='body'>
      <Header headerName='Puhelinluettelo' />
      <ErrorMsg errorMessage={errorMessage} />
      <Notification notificationMessage={notificationMessage} />
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <Footer footerName='Lisää nimiä luetteloon' />
      <AddForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        nameChange={nameChange}
        numberChange={numberChange}
      />
      <Footer footerName='Numerot' />
      <Persons persons={filteredList} removePerson={removePerson} />
    </div>
  )
};

export default App;