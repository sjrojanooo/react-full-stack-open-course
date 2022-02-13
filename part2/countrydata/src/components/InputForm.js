import React from 'react'; 

const InputForm = (props) => {

    return(
        <div>
            find countries: <input 
            type="search"
            value={props.inputValue}
            onChange={props.inputOnChange}
            onReset={props.inputReset}
            ></input>
        </div>
    )
}

export default InputForm; 