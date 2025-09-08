import { useState, useEffect } from 'react'
import SearchLine from './components/SearchLine'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchBar, setSearch] = useState('')
  const [countriesToShow, setCountryList] = useState([])


  useEffect(() => {
    countryService.getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setCountryList(filtered)
  }

  const showCountryHandler = (selectedCountry) => {
    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(selectedCountry.toLowerCase()))
    setCountryList(filtered)  
  }

  if (countriesToShow.length === 1) {
    return (
      <div>
        <SearchLine nameSearch={searchBar} handleSearchChange={handleSearchChange} />
        <CountryInfo country={countriesToShow[0]} />
      </div>
    )
  } else {
  return (
    <div>
      <SearchLine nameSearch={searchBar} handleSearchChange={handleSearchChange} />
      <CountryList countries={countriesToShow} showHandler={showCountryHandler}/>
    </div>
  )
}

}

export default App