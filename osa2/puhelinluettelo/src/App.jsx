import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setFilter] = useState('')
  const [infomessage, setInfoMessage] = useState(null)
  const [notificationStyle, setStyle] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const handleAddEntry = (event) => {
    event.preventDefault()
      const person = persons.find(p => p.name === newName)

    if (persons.some(person => person.name.trim() === newName)) {
      if(confirm(`${newName} is already added to phonebook. Shall I update the number?`)) {
        const updatedPerson = {...person, number: newNumber}
        personService.update(person.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNewName('')
          setNewNumber('')
          setStyle('info')
          setInfoMessage(`Entry '${person.name}' phonenumber was updated to server`)
          setTimeout(() => {setInfoMessage(null)}, 15000)
        })
        return
      }
      return (alert(`${newName} is already added to phonebook`))
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
        personService.create(personObject)
        .then(response => {
                console.log(response)    
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
                setStyle('info')
                setInfoMessage(`Entry '${response.name}' was added to server`)        
                setTimeout(() => {setInfoMessage(null)}, 5000)
              })
    }

  }

  const handleRemoveEntry = (personId) => {
    if(window.confirm("Do you want to remove this entry?")) {
      personService.remove(personId)
      .then(response => {
              setPersons(persons.filter(p => p.id !== personId))
              setStyle('info')
              setInfoMessage(`Entry '${response.name}' was removed from the server`)        
              setTimeout(() => {setInfoMessage(null)}, 5000)
            })
      .catch(error => {
        console.log(error)
        setStyle('error')
        setInfoMessage(`Entry was already removed from server`)        
        setTimeout(() => {setInfoMessage(null)}, 5000)
        setPersons(persons.filter(p => p.id !== personId))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={infomessage} notificationStyle={notificationStyle} />
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleAddEntry={handleAddEntry} />
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} removeHandler={handleRemoveEntry}/>
    </div>
  )

}

export default App