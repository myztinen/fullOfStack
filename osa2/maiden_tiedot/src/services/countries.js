import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => {
    return response.data
  })
}

const getOne = commonName => {
  const request = axios.get(baseUrl, commonName)
  return request.then(response => {
    return response.data
  })
}


export default { 
  getAll, 
  getOne
}