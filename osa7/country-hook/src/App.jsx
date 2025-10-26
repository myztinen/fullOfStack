import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      if( name ) {
          try {
            console.log(`${baseUrl}name/${name}`)
            const { data } = await axios.get(`${baseUrl}name/${name}`)
            console.log(data)

            setCountry({ 
              data: {
                name: data.name.common,
                population: data.population,
                capital: data.capital?.[0] ?? null,
                flag: data.flags.png
              },
              found: true
            })
          } catch (err) {
            setCountry(null)
            console.error(err.message)
          }
        }
    }
    getCountry()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log(country)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App