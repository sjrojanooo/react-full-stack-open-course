import React, {useState} from 'react'; 

const Display = ({counter}) => <div>{counter}</div>;

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {

  // destructured array 
  /* 
    counter is set to the initial value of state which is zero; 
    setCounter is assigned to a function that will modify that state; 
  */
  const [counter, setCounter] = useState(0); 

  /*
   setTimeout function has two parameters:
   a function to increment the counter state and a timeout of one
   second; 
  */
  //  setTimeout(
  //   () => setCounter(counter + 1), 
  //   1000
  // )

  // const handleClick = () => {
  //   console.log('clicked'); 
  // }


  console.log('rendering...', counter)

  const increaseByOne = () => setCounter(counter +1); 
  const setToZero = () => setCounter(0); 
  const decreaseByOne = () => setCounter(counter -1); 

  return (
    <div>
    <Display counter={counter}/> 
    <Button 
    onClick={increaseByOne}
    text='plus'
    />
    <Button
    onClick={setToZero}
    text='zero'
    />
    <Button 
    onClick={decreaseByOne}
    text='minus'
    />
    </div>
  )
}

export default App