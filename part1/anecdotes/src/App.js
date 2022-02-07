import React, {useState} from 'react'; 

/* 
  will be returning to refactor the code and add some conditional 
  components
*/


// global variables;
const anecdoteVotes = Array(7).fill(0); // empty array that will hold the vote count;
const noVotes = 'All anecdotes have 0 votes'; // message that displays if no votes have been recieved yet; 

// Component to display the headers in the application
const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
<button onClick={handleClick}>{text}</button>
)

// Component that will display the votes 
const Votes = ({votes}) => {
  return (
    <div>
      <p>has {votes} votes</p>
    </div>
  )
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(0); 

  // random number generator funciton that will update the displaying 
  // anecdote to the use if the next anecdote button is pressed; 
  const handleAnecdoteClick = (anecdoteArray,selected) => {

    let min = Math.ceil(0); 
    let max = Math.floor(anecdoteArray.length); 
    setSelected(Math.floor(Math.random() * (max - min) + min))

    return anecdoteArray[selected];
  }

  // console.log(selected)
  // function that will update the vote array and incremement the value 
  // each time it is pressed
  // position by one every time the vote button is clicked; 
  const handleVoteClick = (voteArray, selected) => {
    return voteArray[selected] +=1; 
  }

  // function that will display the total number of votes that 
  // correspond to the correct index value of the array; 
  const findTotalVotes = (voteArray, selected) => {
    // console.log(voteArray[selected])
    return voteArray[selected]; 
  }

  // console.log(anecdoteVotes); 

  const findMostVotes = (voteArray) => {

    // correlate that to the anecodte array of values
    // all anecodtes have zero votes string value


    console.log(voteArray)

    if(Math.max(...voteArray) === 0){
      return noVotes; 
    }
    else
    {
      return 'has' + ' ' + Math.max(...voteArray) + ' ' + 'votes';  
    }
  }

  const anecdoteWithMostVotes = (anecdoteArray, voteArray) => {

    // need to find the index of the max value 
    let maxValue = Math.max.apply(Math, voteArray.map((i) => i)); 

    let maxIndex = voteArray.indexOf(maxValue); 

    console.log(maxIndex);

    if(maxValue === 0)
    {
      return true
    }
    else
    {
      return anecdoteArray[maxIndex]; 
    }

  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <p>has {findTotalVotes(anecdoteVotes, selected)} votes</p>
      <div>
      <button onClick={() => handleVoteClick(anecdoteVotes, selected)} text="vote">vote</button>
      <button onClick={() => handleAnecdoteClick(anecdotes, selected)} text="next anecdote">next anecdote</button>
      </div>
      <Header text="Anecdote with the most votes"/>
      <p>{anecdoteWithMostVotes(anecdotes,anecdoteVotes)}</p>
      <p>{findMostVotes(anecdoteVotes)}</p>
    </div>
  )
}
export default App;


 