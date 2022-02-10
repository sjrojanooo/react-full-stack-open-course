import React from 'react';

/*
    the use of a table was not a part of the curriculum, but I decided to implement it here 
    for a cleaner look, and to also get practice with tables. 

    the component will display all name and number in the collection and dynamically render them onto the 
    html table. 
*/

const Person = ({results}) => {

    console.log(results)
    

    return(
        <div>
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

export default Person; 