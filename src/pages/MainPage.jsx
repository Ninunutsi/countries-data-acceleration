import React from 'react'
import useFetch from '../hooks/useFetch';
import useGeocodeCountry from '../hooks/useGeocodeCountry'
import { Navigate, useNavigate } from 'react-router-dom';
import SelectCountry from '../components/SelectCountry';

const MainPage = () => {
    const { data, loading, error } = useFetch('https://restcountries.com/v3.1/all');
    const { country } = useGeocodeCountry();
    const navigate = useNavigate()

    const handleCountrySelect = (selectedValue) => {
        const selectedCountryObj = data.find((item) => item.name.common === selectedValue);
        navigate(`/${selectedCountryObj.cca3}`);
    };

      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }
      if(country){
        const selectedCountryObj = data.find((item) => item.name.common === country);
        return <Navigate to={`/${selectedCountryObj.cca3}`} replace={true}/>
      }
  return (
    <div>
        <SelectCountry data={data} onSelect={handleCountrySelect} />
        <h1 className='pls'>Please Select a Country</h1>
    </div>
  )
}

export default MainPage
