import React, { useEffect } from 'react';
import Header from './components/header';
import { FaArrowLeft } from 'react-icons/fa';
import * as details from './details.module.css';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { update } from './redux/countries';
import { useDispatch, useSelector } from 'react-redux';

export default function Details(props) {
    const dispatch = useDispatch();
    // Theme
    const theme = useSelector((state) => state.theme.value);
    document.body.classList = theme;

    const countries = useSelector((state) => state.countries.value);

    useEffect(() => {
        async function getCountries() {
            let storedCountries = localStorage.getItem('countries');
            if(storedCountries === null) {
              let countriesData = await fetch('https://restcountries.eu/rest/v2/all');
              let json = await countriesData.json();
              dispatch(update(json));
              localStorage.setItem('countries', JSON.stringify(json));
            } else {
              dispatch(update(JSON.parse(storedCountries)))
            }
        }
        getCountries();
    }, [dispatch]);

    if(countries != null) {
        const { countryCode} = props;
        const countryInfo = countries.find(country => country.alpha2Code === countryCode);
    
        const mapValues = (array) => {
            return array.map((item, index) => {
                return index+1 !== array.length ? `${item.name}, ` : item.name
            }).join('')
        }
    
        return (
            <React.Fragment>
                <Header theme={theme} />
    
                <div className={details.main}>
                    <div className="top">
                        <div className={details.back} onClick={() => window.history.back()}>
                            <FaArrowLeft style={{marginRight: '15px'}} />
                            <span>Back</span>
                        </div>
                    </div>
                    <div className={details.details}>
                        <LazyLoadImage 
                            src={countryInfo.flag}  
                            className={details.flag} 
                        />
                        <div className={details.info}>
                            <h1 className={details.name}>{countryInfo.name}</h1>
                            <div className={details.stats}>
                                <div className={details.column}>
                                    <span><strong>Native Name: </strong>{countryInfo.nativeName}</span>
                                    <span><strong>Population: </strong>{countryInfo.population}</span>
                                    <span><strong>Region: </strong>{countryInfo.region}</span>
                                    <span><strong>Sub Region: </strong>{countryInfo.subregion}</span>
                                    <span><strong>Capital: </strong>{countryInfo.capital}</span>
                                </div>
                                <div className={details.column}>
                                    <span><strong>Top Level Domain: </strong>{countryInfo.topLevelDomain}</span>
                                    <span><strong>Currencies: </strong>{mapValues(countryInfo.currencies)}</span>
                                    <span><strong>Languages: </strong>{mapValues(countryInfo.languages)}</span>
                                </div>
                            </div>
                            <div className={details.borderCountries}>
                                <strong>Border Countries: </strong>
                                {countryInfo.borders.map(country => {
                                    var info = countries.find(item => item.alpha3Code === country);
                                    return <Link className={details.borderCountry} to={`/country/${info.alpha2Code}`}>{info.name}</Link>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    } else {
        return null;
    }
}
