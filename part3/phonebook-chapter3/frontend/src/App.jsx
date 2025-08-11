import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import './index.css'; // Make sure to import the CSS file

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className={message.type}>{message.text}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const notify = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = event => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(p => (p.id !== existingPerson.id ? p : returnedPerson))
            );
            notify(`Updated ${returnedPerson.name}'s number`);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            // --- CHANGE 1: Improved error handling for UPDATE ---
            // This now checks for validation errors from the backend first.
            if (error.response && error.response.data.error) {
              notify(error.response.data.error, 'error');
            } else {
              // This is the old logic, for when the person is already deleted.
              notify(
                `Information of ${existingPerson.name} has already been removed from server`,
                'error'
              );
              setPersons(persons.filter(p => p.id !== existingPerson.id));
            }
          });
      }
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        notify(`Added ${returnedPerson.name}`);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        // --- CHANGE 2: Improved error handling for CREATE ---
        // This will display validation errors from your new Express server,
        // like "name must be unique" or "name is too short".
        notify(error.response.data.error, 'error');
      });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
        notify(`Deleted ${name}`);
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
