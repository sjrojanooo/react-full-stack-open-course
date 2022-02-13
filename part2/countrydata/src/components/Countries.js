import React from 'react'; 


// thinking about making this an object with the state hook; 
// this works for all of the weather data but it might look cleaner as a state variable object; 
let celcius = 0; 
let weatherIcon = ''; 
let weatherDescription = ''; 
let windSpeed = 0; 
let farenheit = 0; 

const Countries = (props) => {

    // console.log(props.weather)

    console.log(props.countries); 

    if(props.weather.length !== 0)
    {
        celcius = props.weather.main.temp.toFixed(2); 
        farenheit = ((celcius * 9/5)+ 32).toFixed(2); 
        weatherIcon = props.weather.weather[0].icon; 
        weatherDescription = props.weather.weather[0].description; 
        windSpeed = props.weather.wind.speed;  
        // console.log(weatherIcon)
    }
    
    /*
        Conditional rendering based on the length of the country array; 

    */
    if(props.countries.length > 10 || props.countries.length ===0)
    {
        return(
            <p>Too many matches, please be more specific</p>
        )
    }
    if(props.countries.length > 1 && props.countries.length < 10)
    {
        return(
            <div>
                {props.countries.map((country, index) => 
                    // using the index as the unique value key for each list element; 
                    <li key={index} style={{"padding":"5px"}}> 
                        {country.name} <button
                        value={country.name} // assiging the value of each button to the country name; 
                        onClick={props.handleButtonClick} // handling button click
                        >show</button>   
                    </li>
                )}
            </div>
        )
    }
    return(
        <div>
            {props.countries.map((country,index) => 
                <div key={index}>
                    <h3>{country.name}</h3>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {(country.population)}</p>
                    <h3>Languages</h3>
                    <ul>
                        {country.languages.map((lang,index) => 
                            <li key={index}>{lang.name}</li>    
                        )}
                    </ul>
                    <h3>Flag</h3>
                    <img src={country.flags.png} alt="png"/>
                    <h3>Weather in {country.capital}</h3>
                    <p>{celcius} Degrees Celcius</p> 
                    <p>{farenheit} Degrees Farenheit</p>
                    <p>{weatherDescription}</p>
                    <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="png"/>
                    <p>Wind: {windSpeed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default Countries;