import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import SelectCountry from '../components/SelectCountry'
import useFetch from '../hooks/useFetch'

const Currency = () => {
  const { data, loading, error } = useFetch('https://restcountries.com/v3.1/all');
    const { cca3 } = useParams()
    const [selectedCountry, setSelectedCountry] = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('')
    const [inputValue, setInputValue] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('GEL')

    useEffect(() => {
      if (cca3 && data) {
          const selectedCountryObj = data.find((item) => item.cca3 === cca3);
        if (selectedCountryObj && selectedCountryObj.currencies) {
          const currencyCode = Object.keys(selectedCountryObj.currencies)[0]; 
          const symbol = selectedCountryObj.currencies[currencyCode].symbol;
          setSelectedCountry(selectedCountryObj.name.common);
          setCurrencySymbol(symbol);
          
          fetch(`https://api.exchangerate.host/convert?from=${currencyCode}&to=${selectedCurrency}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(`from ${currencyCode}`)
            console.log(`to ${selectedCurrency}`)
            const exchangeRate = data.info.rate;
            if (inputValue !== '' && !isNaN(inputValue)) {
              const convertedAmount = inputValue * exchangeRate;
              setConvertedAmount(convertedAmount);
            }
            
          })
          .catch((err) => console.log(err));
        }
        
      }
    }, [cca3, data, inputValue])


    useEffect(() => {
      if (cca3 && data){
        const selectedCountryObj = data.find((item) => item.cca3 === cca3);
        if (selectedCountryObj && selectedCountryObj.currencies){
          const currencyCode = Object.keys(selectedCountryObj.currencies)[0]; 
          const symbol = selectedCountryObj.currencies[currencyCode].symbol;
          setSelectedCurrencySymbol(symbol)
        }
      }
    }, [data])

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    }

    const handleCountrySelect = (selectedValue) => {
      setSelectedCountry(selectedValue);
      const selectedCountryObj = data.find((item) => item.name.common === selectedValue);
      if(selectedCountryObj && selectedCountryObj.currencies){
        const currencyCode = Object.keys(selectedCountryObj.currencies)[0]; 
        const symbol = selectedCountryObj.currencies[currencyCode].symbol;
        setSelectedCurrencySymbol(symbol)
        setSelectedCountry(currencyCode)
        setSelectedCurrency(currencyCode)
      }
  }

    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  return (
    <div className='currency'>
    <h1 className='currency-heading'>Currency-exchange</h1>
      <div className='currency-main'>
      <SelectCountry data={data} onSelect={handleCountrySelect} />
      <div className="calculator">
        <div className='currency-from'>
          <p className='currency-symbol'>{currencySymbol}</p>
          <input type="number" placeholder='0.00' className='input'  value={inputValue}
            onChange={handleInputChange}/>
        </div>
        <div>=</div>
        <div className='currency-from'>
          <p className='currency-symbol'>{selectedCurrencySymbol}</p>
          <p className='input converted'> {convertedAmount !== null ? convertedAmount.toFixed(2) : '0.00'}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Currency
