import React from 'react'; 

const Footer = () => {
    const footerStyle = {
        color: 'dodgerblue', 
        fontSize: 20, 
        fontStyle: 'Fair Sans'
    }

    return(
        <div style={footerStyle}>
            <br/>
            <em>Phonebook App, Steven Rojano, Copyright 2022</em>
        </div>
    )
}

export default Footer; 