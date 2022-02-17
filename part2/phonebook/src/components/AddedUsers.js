import React from 'react'; 

const AddedUser = ({addedUserMessage}) => {

    if(addedUserMessage === null){
        return null
    }

    return(
        <div className="userAdded">
           {addedUserMessage}
        </div>
    )
}

export default AddedUser; 