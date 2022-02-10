import React from 'react'; 

/*
    component is a form that recieves a input value to search through a data collection. 
    
*/

const Phonebook = (props) => 
{
    return(
        <div>
            <form>
                search contact: <input
                type="search"
                value={props.handleValue}
                onChange={props.handleFilter}
                />
            </form>
            <hr/>
        </div>
    )
}

export default Phonebook;