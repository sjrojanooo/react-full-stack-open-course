import React from 'react';

/*
    the use of a table was not a part of the curriculum, but I decided to implement it here 
    for a cleaner look, and to also get practice with tables. 

    the component will display all name and number in the collection and dynamically render them onto the 
    html table. 
*/

const Person = ({person, deleteContact}) => {

    return(
      <li>{person.name} {person.number}
      <button 
      style={{
        "marginLeft":"5px",
        "marginTop":"5px"
      }}
      onClick={deleteContact}>delete</button>
      </li>
    )
}

export default Person; 