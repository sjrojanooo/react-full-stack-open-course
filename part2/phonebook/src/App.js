import React, {useState} from 'react'; 
import Numbers from './components/Numbers'; 
import Form from './components/Form'; 


const App = (props) => {

  // passing the array of persons into the useState function using our props parameter;
  const [persons, setPersons] = useState(props.persons); 

  // State variable to create a new person; 
  const [newPerson, setNewPerson] = useState('');
 
  // State variable for each number added;
  const [newNumber, setNewNumnber] = useState('');

  // State variable for input value used to search contacts; 
  const [newFilter, setNewFilter] = useState('');

  // component to add a new person to the existing array 
  /* 
    targetting the value of the object and setting each event handler to 
    it's specific property. 
  */
  const addPerson = (event) => {

    event.preventDefault()

    let nameInput = newPerson; 

    let nameArray = persons.map(name => name.name); 
    
    // if either input box is left as a null or undefined then the user will 
    // be alerted to enter a valid name and number
    if(newNumber === null || 
      newNumber.length < 9 ||
      newNumber === undefined || 
      newPerson === null ||
      newPerson === undefined
      )
      {
        return alert('Please enter a valid name and number!')
      }

    // conditional statement is using the find method to return the value of the first element; 
    // in the provided array that satisfies the test being performed;
    // if no values are foudn the value return is undefined, and the user is alerted that the contact already exists; 
    if(nameArray.find(element => element === nameInput) !== undefined)
    { 
      return alert( nameInput + ' is already in the phonebook!')
    }
    // if all conditional tests are satisfied, the contact will then retrieve the 
    // state variables newPerson & newNumber and add the contact to the phonebook. 
    else
    {
      const newPersonObject = {
        name: newPerson, 
        number: newNumber, 
        id: persons.length + 1
      };
      // console.log(newPersonObject);
      setPersons(persons.concat(newPersonObject));
      setNewNumnber('');
      setNewPerson(''); 
    }
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
  }

  const handleAddNumber = (event) => {
    // console.log(event.target.value)
    setNewNumnber(event.target.value)
  }
  
  const handleFilter = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  /* 
    filter logic if there is no input value for the filter 
    we will copy all elements and values in the array
    otherwise we are returning all names in lower case format 
    and finding all values in the array that match a value types in the input element;
  */
  const results = !newFilter
  ? [...persons] // spread operator to make a copy of the initial state array 
  : persons.filter(person => 
      person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
  );
  


  console.log(results)

  return(
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter contacts <input 
          type="search"
          value={newFilter}
          onChange={handleFilter}
          />
        </div>
      </form>
      <hr/>
      <h3>Add New Contact</h3>
      <form onSubmit={addPerson}>
        <div>
        name: <input 
          style={{marginBottom:".5rem"}}
          value={newPerson} onChange={handleAddPerson}
          />
        </div>
        <div>
        number: <input 
        style={{marginBottom:".5rem"}}
        value={newNumber} 
        onChange={handleAddNumber}
        /> 
        </div>
        <button type="submit">save</button>
      </form>
      <br/>
      <hr/>
      <h3>Contact List</h3>
      <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <thead>
        <tr>
          <th style={{
                  "padding": "20px",
                  "borderWidth":"1px",
                  "borderColor":"#aaaaaa",
                  "borderStyle":"Solid"
                }}>Name</th>
          <th style={{
                  "padding": "20px",
                  "borderWidth":"1px",
                  "borderColor":"#aaaaaa",
                  "borderStyle":"Solid"
                }}>Phone Number</th>
        </tr>
        </thead>
        <tbody>
          {results.map(person => 
              <tr key={person.id}>
                <td style={{
                  "padding": "20px",
                  "borderWidth":"1px",
                  "borderColor":"#aaaaaa",
                  "borderStyle":"Solid"
                }}
                >{person.name}</td>
                <td style={{
                  "padding": "20px",
                  "borderWidth":"1px",
                  "borderColor":"#aaaaaa",
                  "borderStyle":"Solid"
                }}
                >{person.number}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )

}
export default App; 
