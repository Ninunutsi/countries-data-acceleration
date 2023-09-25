import React, { useState } from 'react'

function SelectCountry({data, onSelect, country=''}) {
    const [selectedCountry, setSelectedCountry] = useState('Georgia');

    const handleCountrySelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedCountry(selectedValue);
        onSelect(selectedValue);
    };

  return (
    <header className='header'>
      <select onChange={handleCountrySelect} value={selectedCountry}>
        <option className='option'disabled selected>Pick a Country</option>
            {data .sort((a, b) => {
              return a.name.common.localeCompare(b.name.common);
            }).map((item) => (
                <option className='option'value={item.name.common} key={item.cca2}>{item.name.common}</option>
            ))}
       </select>
    </header>
  )
}

export default SelectCountry
