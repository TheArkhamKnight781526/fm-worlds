import React from 'react';
import CountryCard from './countryCard';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { v4 as uuidv4 } from 'uuid';

function CountriesGrid(props) {
    const { countries } = props;
    let cardNum = 10;
    if(countries !== null) {
        return (
            <React.Fragment>
                {
                    countries.map((country, index) => {
                        return <CountryCard 
                        flag={country.flag} 
                        name={country.name}
                        population={country.population}
                        region={country.region}
                        capital={country.capital}
                        countryCode={country.alpha2Code}
                        ml={index % cardNum !== 0}
                        key={uuidv4()} />
                    })
                }
            </React.Fragment>
        )
    } else {
        return null
    }
}

export default trackWindowScroll(CountriesGrid);
