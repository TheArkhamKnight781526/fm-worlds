import React from 'react';
import * as card from './css/countryCard.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

export default function CountryCard(props) {
    const { flag, name, population, region, capital, countryCode, ml } = props;

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className={`${card.countryCard}${ml === true ? ` ${card.ml}` : ''}`}>
            <LazyLoadImage 
                src={flag}
                width="100%"
                height="50%"
                placeholder={<div className={card.flag}></div>}
                alt={`${name} Flag`}
            />
            {/* <div className={card.flag}></div> */}
            <div className={card.content}>
                <Link to={`/country/${countryCode}`} className={card.name}><h1>{name}</h1></Link>
                <div className={card.stats}>
                    <span className={card.population}><strong>Population: </strong>{numberWithCommas(population)}</span>
                    <span className={card.region}><strong>Region: </strong>{region}</span>
                    <span className={card.capital}><strong>Capital: </strong>{capital}</span>
                </div>
            </div>
        </div>
    )
}
