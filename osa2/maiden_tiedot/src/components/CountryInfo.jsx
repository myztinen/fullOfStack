import { useState, useEffect } from 'react'
import weatherService from '../services/weather'
const CountryInfo = ({country}) => {
    const [temperature, setTemp] = useState(0)
    const [windSpeed, setWind] = useState(0)

      
    useEffect(() => {   
        weatherService.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(response => {
            setTemp(response.current.temperature_2m)
            setWind(response.current.wind_speed_10m)
            console.log(response)
        })
        }, [country])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital}</div>
            <div>Area {country.area}</div>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} width='200' />
            <h2>Weather in {country.capital[0]}</h2>
            <div>Temperature {temperature} Celcius</div>
            <div>Wind {windSpeed} m/s</div>
        </div>
    )
}
export default CountryInfo

