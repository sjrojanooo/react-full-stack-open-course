import React, { useState } from 'react';


// Components being called outside of the application; 
// Achieving a much more condensed look with the arrow functions; 
const Header = ({header}) => <h1>{header}</h1>;

/* 
 Component that holds the custom variables handleClick, and 
 text as our props;
*/
const Button = ({handleClick, text}) => (
<button onClick={handleClick}>{text}</button>
)

/* 
  Conditionally rendered component that is dependent whether or not 
  buttons have been clicked inside of the application. 

*/
const Statistics = (props) => {

  if(props.allClicks.length === 0){
    return (
      <div>
          No feedback given. 
      </div>
    )
  }
  return (
    <div>
      <p>{props.goodText}: {props.goodVal}</p>
      <p>{props.neutralText}: {props.neutralVal}</p>
      <p>{props.badText}: {props.badVal}</p>
      <p>{props.allText}: {props.allVal}</p>
      <p>{props.averageText}: {props.averageFunction}</p>
      <p>{props.positiveText}: {props.positiveVal}{props.percentageText}</p>
    </div>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [allClicks, setAll] = useState([]); 

  const [counter, setCounter] = useState(0);
  
  const headerOne = 'give feedback'; 
  const headerTwo = 'statistics'; 

  // functions that have the correct effect on the counter depending on the review chosen
  const increaseByOne = () => setCounter(counter + 1); 
  const decreaseByOne = () => setCounter(counter - 1); 
  const noValChange = () => setCounter(counter + 0); 


  /*
    Functions that are interacting with the deconstructed array useState functions 
    from above. Each provides a specific behavior and applies the correct value 
    to the state variable arrays.
  */
  const handleGoodClicks = () => {
    setGood(good + 1)
    increaseByOne(); 
    setAll(allClicks.concat('G')); 
  };

  const handleNuetralClicks = () => {
    setNeutral(neutral + 1);
    noValChange(); 
    setAll(allClicks.concat('N')); 
  };

  const handleBadClicks = () => {
    setBad(bad + 1);
    decreaseByOne(); 
    setAll(allClicks.concat('B')); 
  };
  

  // Variable declaration that will hold the length of the array 
  // in the functions below. 
  let arrayLength = 0; 

  // function that calculates the average rating of all reviews; 
  const average = (reviewScore, totalClicks) => {

    arrayLength = totalClicks.length; 
    console.log(arrayLength); 
    if((reviewScore === 0) &&(arrayLength ===0))
    {
      return 0 
    }
    else
    {
      return reviewScore/allClicks.length; 
    }
  }
  return (
    <div>
      <Header header={headerOne} />
        <Button handleClick={() => handleGoodClicks()} text="Good"/>
        <Button handleClick={() => handleNuetralClicks()} text="Nuetral"/>
        <Button handleClick={() => handleBadClicks()} text="Bad"/>
      <Header header={headerTwo} />
      <Statistics 
        allClicks={allClicks}
        goodText="good" goodVal={good}
        neutralText="neutral" neutralVal={neutral}
        badText="bad" badVal={bad}
        allText="all" allVal={allClicks.length}
        averageText="average" averageFunction={average(counter, allClicks)}
        positiveText="positive" positiveVal={average(good,allClicks * 100)} percentageText="%"
      />
    </div>
  )
}

export default App; 
