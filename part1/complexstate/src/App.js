import React, {useState} from 'react'; 

const History = (props) => {
  if(props.allClicks.length ===0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press histor: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  // A state that will remember all clicks that occur in the application 
  const [allClicks, setAll] = useState([]) 

  // alternative way to useState 
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // }); 

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1) 
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1) 
  }

  // const handleLeftClick = () => {
  //   const newClicks = {
  //     left: clicks.left + 1, 
  //     right: clicks.right
  //   }
  //   setClicks(newClicks);
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     left: clicks.left, 
  //     right: clicks.right + 1
  //   }

  //   setClicks(newClicks); 
  // }

  // using the spread operator 
  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks, 
  //     left: clicks.left + 1
  //   }
  //   setClicks(newClicks); 
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //   ...clicks, 
  //   right: clicks.right + 1
  //   }
  //   setClicks(newClicks); 
  // }

  /*
    Final form using the spread operator. 
    It is not necessary to assign the object to a variable, 
    the function can be simplified in the following format. 
  */

  // const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
  // const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})
  // const clearClicks = () => setClicks({
  //     ...clicks, 
  //     right: clicks.right = 0,
  //     left: clicks.left = 0
  // });



  // const clearClicks = () => {
  //   const clearClick = {
  //     left: clicks.left = 0, 
  //     right:clicks.right = 0
  //   }

  //   setClicks(clearClick); 
  // }

  // const setLeftZero = () => setClicks.left(0); 
  // const setRightZero = () => clicks.right(0); 

  //Conditional rendering 
  const [value, setValue] = useState(10); 

  const setToValue = (newValue) => {
    setValue(newValue); 
  }
  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thousand"/>
      {/* <div>
        <button onClick={hello('world')}>button</button>
        <button onClick={hello('react')}>button</button>
        <button onClick={hello('function')}>button</button>
      </div>
      {value} */}
    </div>
    
  )
}

export default App; 