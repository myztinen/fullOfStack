import CountryInfo from "./CountryInfo"

const CountryList = ({countries, showHandler}) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 0) {
        return (<div>Did match any country</div>)
    } else return (
        <div>
            {countries.map(country => <div key={country.cca3}>{country.name.common} <button onClick={() => showHandler(country.name.common)}>show</button> </div>)}
        </div>
    )
}
export default CountryList

