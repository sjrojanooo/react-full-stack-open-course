import React from 'react'; 

/*
    component use case is to add a new person and number to the initial collections presented 
    in the index js file. 
*/

const PersonForm = (props) => {

    return(
        <div>
            <h3>Add New Contact</h3>
            <form onSubmit={props.handleSubmitPerson}>
                <div>
                    name: <input 
                    style={{"marginBottom":".5rem"}}
                    type="input"
                    value={props.handleNewPerson}
                    onChange={props.handleSetPerson}
                    />
                </div>
                <div>
                    number: <input 
                    style={{"marginBottom":".5rem"}}
                    type="input"
                    value={props.handleNewNumber}
                    onChange={props.handleSetNumber}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default PersonForm;