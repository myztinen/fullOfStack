import axios from 'axios'
const baseUrl = 'https://api.open-meteo.com/v1/forecast?'

const getWeather = (latitude, longitude) => {
  const request = axios.get(`${baseUrl}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`)
  return request.then(response => {
    return response.data
  })
}


export default { 
  getWeather
}