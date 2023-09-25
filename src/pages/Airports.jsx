import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import useDebounce from '../hooks/useDebounce'

const API_KEY = "t7gaX6mPm5cwFpg3w6HWq8Yt0wpJDABVa9dXVvo9"

const Airports = () => {
  const { data } = useFetch('https://restcountries.com/v3.1/all');
  const { cca3 } = useParams();
  const [countryCode, setCountryCode] = useState('')
  const [airports, setAirports] = useState([])
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 500);
  const [cache, setCache] = useState({})
  const [loading, setLoading] = useState(false); 
  
  useEffect(() => {
    if(data && cca3){
      if (cache.hasOwnProperty(cca3)) {
        const cachedCountryData = cache[cca3]
        setCountryCode(cachedCountryData.countryCode)
        setAirports(cachedCountryData.airports)
      }else{
        const selectedCountryObj = data.find((item) => item.cca3 === cca3)
        if (selectedCountryObj && selectedCountryObj.cca2){
          console.log(selectedCountryObj.cca2)
          const countryCodeObj = selectedCountryObj.cca2
          setCountryCode(countryCodeObj)
          setCountryCode(countryCodeObj)
          setLoading(true);
          fetchAirportsData(countryCodeObj)
        }
      }
    }
    
  }, [cca3, data,  debouncedInputValue, cache])

  const fetchAirportsData = (countryCodeObj) => {
    fetch(`https://api.api-ninjas.com/v1/airports?country=${countryCodeObj}`, {
      method: 'GET',
      headers: {
        "X-Api-Key": API_KEY,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setCache((prevCache) => ({
          ...prevCache,
          [cca3]: { countryCode: countryCodeObj, airports: data },
        }));
        setAirports(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })

  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setInputValue(value)
  }

  return (
    <div className='airports-main'>
      <h1 className='airports-heading'>Airports</h1>
      <input 
        type="text" 
        placeholder='Search for airport' 
        value={inputValue}
        onChange={handleSearchChange}
        className='airport-input'/>
      <div className="airports">
      {loading ? (
          <p style={{color: 'white'}}>Loading airports...</p>
        ) : (
          airports
            .filter((val) => {
              if (inputValue === '') {
                return val;
              } else if (val.name.toLowerCase().includes(inputValue.toLocaleLowerCase())) {
                return val;
              }
            })
            .map((val, key) => (
              <p className='airport-para' key={val.id}>
                {val.name}
              </p>
            ))
        )}
      </div>
    </div>
  )
}

export default Airports

