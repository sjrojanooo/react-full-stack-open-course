import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import InputForm from './components/InputForm';
import Countries from './components/Countries'; 

const App = () => {

  // State variables 
  const [query, setQuery] = useState([]); // for the user query entered in the input element
  const [countries, setCountries] = useState([]); // for the data response from the country api 
  const [weather, setWeather] = useState([]); // for the weather data of the countries capital


  /*
    The docs under hooks mention that you can optimize the useEffect hook and actually trigger 
    the useEffect Hook by passing a parameter (in this case my query array into the array) in the empty array; 
    this tells react to only run this effect only if the array changes. 
    Inside is a conditional argument that initiates when the query does not equal a blank string. 
    Axios then fetched for the data and immediately filters the data set with the characters 
    entered into the input search element. The countries state variable is then set to this query; 
  */
  useEffect(() => {
    const countryUrl = 'https://restcountries.com/v2/all'; 
    if(query !== '')
    {
      axios
      .get(countryUrl)
      .then(response => {
        const queryResult = response.data.filter(country => 
            country.name.toLowerCase().includes(query.toLowerCase())
        );
        // console.log(response.data)
        setCountries(queryResult)
      });      
    };
    // console.log(countries); 
  },[query]); // array paramater for the useEffect Hook; 

  /*
    Same approach for the weathermap api request. Except I am passing the country data into this Hook. 
    when the value of the countries array changes the Hook is initiated. If the length of the countries 
    array is equal to one, then the code locates the country's capital, 
    fetches the weather data, and returns the degrees in metric units. 
  */
  useEffect(() => {
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='; 
    const apiKey = process.env.REACT_APP_NOT_SECRET_CODE; // secret code stored in the .env file. 
    if(countries.length ===1) 
    {
      const capital = countries.map(country => country.capital); 

      // console.log(countries)
      if(capital[0])
      {
        axios
        .get(`${weatherUrl}${capital[0]}&appid=${apiKey}&units=metric`)
        .then(response => 
          setWeather(response.data) // setting our weather state variables data. 
          
        )
      }
    }
  },[countries])

  
  const handleInputChange = (event) => {
    // console.log(event.target.value)
    setQuery(event.target.value)
  }

  const handleButton = (event) => {
    event.preventDefault(); 
    const countrySelected = countries.filter(country => 
        country.name.includes(event.target.value)
    )
    // console.log(countrySelected)
    setCountries(countrySelected); 
  }

  return(
    <div>
    <h3>Country Info</h3>
    <InputForm
    inputOnChange={handleInputChange}
    inputValue={query}
    />
    <Countries 
    countries={countries}
    weather={weather}
    handleButtonClick={handleButton}
    />
    </div>
  )

}

export default App