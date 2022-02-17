import React, {useState, useEffect} from 'react'; 
import Phonebook from './components/Phonebook';
import PersonForm from './components/PersonForm'; 
import Persons from './components/Persons'; 
import Footer from './components/Footer'; 
import ErrorNotification from './components/ErrorNotification'; 
import AddedUsers from './components/AddedUsers'; 
import contactService from './services/contacts'; 
import './index.css'

const App = () => {

  // passing the array of persons into the useState function using our props parameter;
  const [persons, setPersons] = useState([]); 

  // State variable to create a new person; 
  const [newPerson, setNewPerson] = useState('');
 
  // State variable for each number added;
  const [newNumber, setNewNumnber] = useState('');

  // State variable for input value used to search contacts; 
  const [newFilter, setNewFilter] = useState('');

  // State variable that displays the messages to the user; 
  const [newErrorMessage, setErrorMessage] = useState(null); 

  // state variable that dispalys when a user was added; 
  const [newUserAddedMessage, setUserAddedMessage] = useState(null); 
  
  /*
    using the state hook side effect component to fetch our persons data from the server; 
    the empty array dictates the behaviour of the useEffect, the effect is only run with the first render of the component; 

  */

  // using a service to fetch the data from the server; 
  useEffect(() => {
    
    if(newFilter === '')
    {
      contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)

      })

      .catch(err => {
        console.log(err)
        setTimeout(() => {
          setUserAddedMessage(null)
          setErrorMessage(null)
        },4000)

      })
    }
    else
    {
      contactService
      .getAll()
      .then(initialContacts => {
        const results = initialContacts.filter(contact => 
          contact.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        setPersons(results)
      })
      .catch(err => {
        console.log(err)
        setTimeout(() => {
          setUserAddedMessage(null)
          setErrorMessage(null)
        },4000)
      })
    }
  },[newFilter])

  /* 
    targetting the value of the object and setting each event handler to 
    it's specific property. 
  */
  const addPerson = (event) => {

    event.preventDefault();

    // I added a function inside the id property. I noticed that when I deleted all contacts 
    // the program resulted in an error. 
    const newPersonObject = {
      name: newPerson, 
      number: newNumber, 
      // function assigns a def
      id: function (persons) {
        return persons[persons.length -1].id + 1
      } 
    }

    console.log(newPersonObject)
    
    
    // if either input box is left as a null or undefined then the user will 
    // be alerted to enter a valid name and number
    if(
      newNumber === null || 
      newNumber.length < 9 ||
      newNumber === undefined || 
      newPerson === null ||
      newPerson === undefined
      )
      {
        return alert('Please enter a valid name and number!')
      }

    
    // finding a name that matched the value entered in the input element 
    const contactId = persons.find(person => person.name === newPersonObject.name)

    // changing the phone number if for that contact if there is a match. 
    const changedNumber = {...contactId, number: newPersonObject.number}

    console.log(changedNumber)

    if(
      persons.find(person => person.name.toLowerCase() === newPersonObject.name.toLowerCase()) !== undefined &&
      persons.find(person => person.number === newPersonObject.number) === undefined
      )
    {
      if(window.confirm(`${newPersonObject.name} is already added to phonebook, replace old number with new one?`))
      {

        contactService
        .modify(changedNumber.id, changedNumber)
        .then(modifiedNumber => {
          setPersons(persons.map(person => person.id !== modifiedNumber.id ? person : modifiedNumber))
        })
        .catch(err => {
          setErrorMessage(`Information for ${changedNumber.name} has already been removed from the server`); 
          setTimeout(()=>{
            setErrorMessage(null)
          },4000)

        })
        
      }  
    }
    else if(persons.find(person => person.name.toLowerCase() === newPersonObject.name.toLowerCase()) !== undefined)
    { 
      alert(`${newPersonObject.name} is already in the phone book`)
      setNewNumnber('');
      setNewPerson(''); 
    }
    else
    {

      contactService
      .create(newPersonObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))

        setNewNumnber('');
        setNewPerson('');

        setUserAddedMessage(
          `Successfully Added ${newPersonObject.name}`
        )
        setTimeout(() => {
          setUserAddedMessage(null)
        },4000)
      })
      .catch(err => {

      })

      console.log(newPersonObject)
      console.log(persons)

    }

    setNewNumnber('');
    setNewPerson(''); 
  }


  /* 
    implementing event delegation with the event.target to capture the values 
    changed on input elements of person, phone number, and search input, respectively. 
    handleFilter, uses a method to format all character values to lowercase to avoid 
    case specific character entries from user. 
  */
  const handleAddPerson = (event) => {
    // console.log(event.target.value)
    setNewPerson(event.target.value)

    console.log(newPerson)
  }

  const handleAddNumber = (event) => {
    // console.log(event.target.value)
    setNewNumnber(event.target.value)
  }
  
  const handleFilter = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
  }



  const deleteContactId = id => {
    // finds the note that we want to modify and we assign it to the note variable
    const personSelected = persons.find(n => n.id === id); 
    const personObject = persons.filter(person => person.id !== id)
    
    if(window.confirm(`Are you sure you want to delete ${personSelected.name}`)){
      contactService
      .deletePerson(id)
      .then(response => {
        setPersons(personObject)
      })
      .catch(err => {

      })
    }
    else
    console.log(personObject)
    console.log(persons)

  }

  
  return(
    <div>
      <h2>Phonebook</h2>
      <Phonebook 
      newFilter={newFilter}
      handleFilter={handleFilter}
      />
      <AddedUsers addedUserMessage={newUserAddedMessage}/>
      <ErrorNotification errorMessage={newErrorMessage}/>
      <PersonForm 
      handleSubmitPerson={addPerson}
      handleNewPerson={newPerson}
      handleSetPerson={handleAddPerson}
      handleNewNumber={newNumber}
      handleSetNumber={handleAddNumber}
      />
      <br/>
      <hr/>
      
      {/* here i am passing the results variable 
        into our persons component so that the filtering conditional logic from above will 
        take place on the newly filtered collection; 
      */}
      <ul>
        {persons.map(person =>
          <Persons 
            key={person.id}
            person={person}
            deleteContact={() => deleteContactId(person.id)}
          />  
        )}
      </ul>
      <Footer/>
    </div>
  )

}
export default App; 
