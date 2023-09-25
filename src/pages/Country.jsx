import React, { useState, useEffect } from 'react'
import { useParams, useLoaderData, useNavigate, NavLink, Outlet} from 'react-router-dom'
import SelectCountry from '../components/SelectCountry';
import useFetch from '../hooks/useFetch';
import useLazyFetch from '../hooks/useLazyFetch'
import CountryData from '../components/CountryData';

const Country = () => {
    const { data, loading, error } = useFetch('https://restcountries.com/v3.1/all');
    const { cca3 } = useParams()
    const [fetchSelectedCountryData, {data: selectedCountryData}] = useLazyFetch()
    const datas = useLoaderData()
    const [selectedCca3, setSelectedCca3] = useState('');
    const navigate = useNavigate();
    
// useLazyFetch
    useEffect(() => {        
        fetchSelectedCountryData(`https://restcountries.com/v3.1/alpha/${cca3}`);
      }, [cca3]);

    const handleCountrySelect = (selectedValue) => {
        setSelectedCca3(selectedValue);
        const selectedCountryObj = data.find((item) => item.name.common === selectedValue);
        navigate(`/${selectedCountryObj.cca3}`);
    }

    if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }

    if (!datas) {
        return <div>Loading...</div>
      }
  return (
    <div>
        <SelectCountry data={data} onSelect={handleCountrySelect}/>
      {selectedCountryData && (
        <CountryData 
            cca3={selectedCountryData[0].cca3}
            flags={selectedCountryData[0].flags}
            name={selectedCountryData[0].name.common}
            capital={selectedCountryData[0].capital}
            region={selectedCountryData[0].region}
            subregion={selectedCountryData[0].subregion}
            continents={selectedCountryData[0].continents}
            population={selectedCountryData[0].population}
            borders={selectedCountryData[0].borders}
            currencies={selectedCountryData[0].currencies}
            />
      )}


      <div className="currency-aeroports">
        <div>
          <nav className='links-nav'>
            {/* nested routes */}
            <NavLink to={`/${cca3}`} className='link' activeClassName='active-link'>Currency-exchange</NavLink>
            <NavLink to='airports' className='link'  activeClassName='active-link'>Airports</NavLink>
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Country

export const detailsLoader = async ({params}) => {
    const {cca3} = params

    const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)

    return await res.json()
}