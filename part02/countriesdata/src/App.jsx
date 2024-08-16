import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = "8231eb7f88e5435aaf865012240107"

const SearchField = ({searchBar, search}) => {
  return (
    <div>
      <p> find countries <input value={searchBar} onChange={search}></input></p>
    </div>
  )
}



const List = ({list, show}) => {
  if (list.length > 10) {
    return <p>Too many matchdes, specify another filter</p>
  }
  return (
    <div>
      <ul>
        {list.map(a => <li key={a}>{a}<button onClick={() => show(a)}>show</button></li>)}
      </ul>
    </div>
  )
}

const Result = (country) => {
  if (country.name === null) {
    return null
  }
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(a => <li key={a}>{a}</li>)}
      </ul>
      <img src={country.flag.png} alt={country.flag.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {country.temp} Celcius</p>
      <img src={country.cond.icon} alt={country.cond.text} />
      <p>wind {country.wind} km/h</p>
    </div>
  )
}

const App = () => {
  const getCountries = () => {
    return (
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
           .then((res) => res.data)
    )
  }

  const getResult = (name) => {
    return (
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/name/" + name)
    )
  }

  const getWeather = (name) => {
    return (
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${name}&aqi=no`)
           .then(res => ({temp:res.data.current.temp_c, wind: res.data.current.wind_kph, cond: res.data.current.condition}))
    )
  }

  const [searchBar, setSearchBar] = useState('')
  const search = (event) => {
    setSearchBar(event.target.value)
    console.log(event.target.value)
  }

  const [list, setList] = useState([])
  useEffect(() => {
    getCountries().then((res) => {
      setList(
        res.map(a => a.name.common).filter(a => a.toLowerCase().includes(searchBar.toLowerCase()))
      )})
    }, [searchBar])

  const [result, setResult] = useState(null)
  const [weather, setWeather] = useState(null)
  const show = (name) => {
    getResult(name).then(res => {
      setResult(res.data)
      getWeather(res.data.name.common).then(res => setWeather(res))
      console.log(weather)
    })
  } 

  return(
    <div>
      <SearchField searchBar={searchBar} search={search} />
      <List list={list} show={show} /> 
      <Result
        name={result ? result.name.common : null}
        capital={result ? result.capital : null}
        area={result ? result.area : null}
        languages={result ? result.languages : null}
        flag={result ? result.flags : null}
        temp={result ? weather.temp : null}
        wind={result ? weather.wind : null}
        cond={result ? weather.cond : null}
      />
    </div>
    
  )
}


export default App