import React from 'react'; 

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {  
  return (
    <div>
      <p>{props.name1} {props.exercise1} </p>
      <p>{props.name2} {props.exercise2} </p>
      <p>{props.name3} {props.exercise3} </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  const sum = (e1, e2, e3) => {
    return e1 + e2 + e3; 
  };

  const nameArray = parts.map(value => value.name);
  const exerciseArray = parts.map(value => value.exercises); 

  console.log(nameArray);
  console.log(exerciseArray);

  return (
    <div>
    <Header course = {course}/>
    <Content 
      name1={nameArray[0]} exercise1={exerciseArray[0]}
      name2={nameArray[1]} exercise2={exerciseArray[1]}
      name3={nameArray[2]} exercise3={exerciseArray[2]}
    />
    <Total 
      total={sum(exerciseArray[0],exerciseArray[1],exerciseArray[2])}
    />
    </div>

  )
}

export default App 