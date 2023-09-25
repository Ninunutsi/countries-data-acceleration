import React from 'react'

const CountryData = ( {name='', capital='', region='', subregion='', currencies='', borders='', population='', flags='', continents='', cca3=''}) => {
  return (
    <main className='main'>
      <div className="country-data-heading">
        <p className='symbol'>#</p>
        <h1>{name}</h1>
        <img src={flags.png} alt={flags.alt} className='flag'/>
        <p className='cca3'>{cca3}</p>
      </div>
      <div className="whole-country-data">
        <div className="country-data-info-single">
          <h3>Capital:</h3>
          <h2>{capital}</h2>
        </div>
        <div className="country-data-info-single">
          <h3>Region:</h3>
          <h2>{region}, {subregion}</h2>
        </div>
        <div className="country-data-info-single">
          <h3>Currency:</h3>
          {Object.keys(currencies).map(currencyCode => (
            <h2 key={currencyCode}>
              {currencies[currencyCode].name} 
              ({currencies[currencyCode].symbol})
            </h2>
          ))}
        </div>
        <div className="country-data-info-single">
          <h3>Continent:</h3>
          {continents.map((continent) => <h2>{continent}</h2>)}
        </div>
        <div className="country-data-info-single">
          <h3>Population:</h3>
          <h2>{population}</h2>
        </div>
        <div className="country-data-info-single">
          <h3>Borders:</h3>
          {/* {borders && borders.length > 0 ? (
            borders.map((border) => <h2 key={border}>{border}</h2>)
          ) : (
            <h2>No borders</h2>
          )} */}
          {borders && borders.length > 0 ? (
            <div style={{ display: 'inline-block' }}>
              {borders.map((border, index) => (
                <span className='span' key={border}>
                  {index > 0 && ', '}
                  {border}
                </span>
              ))}
            </div>
            ) : (
            <h2>No borders</h2>
          )}
        </div>
      </div>

    </main>
  )
}

export default CountryData
