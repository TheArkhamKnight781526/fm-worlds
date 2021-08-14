import React from 'react';
import Dropdown from 'react-select';
import { FaSearch, FaAngleDown, FaAngleUp } from 'react-icons/fa';
const _ = require('lodash');

export default function Filters(props) {
    const { regionFilter, setRegionFilter, countries, updateCountries } = props;

    const themeVariables = getComputedStyle(document.body);

    const filters = [
        {value: null, label: 'None'},
        {value: 'africa', label: 'Africa'},
        {value: 'americas', label: 'America'},
        {value: 'asia', label: 'Asia'},
        {value: 'europe', label: 'Europe'},
        {value: 'oceania', label: 'Oceania'}
    ]

    const dropdownStyles = {
        control : () => ({
          width: '200px',
          display: 'flex',
          background: themeVariables.getPropertyValue('--elements-background'),
          borderRadius: '10px',
          alignItems : 'center',
        }),
        menu : () => ({
          background: themeVariables.getPropertyValue('--elements-background'),
          position: 'absolute',
          width: '100%',
          borderRadius: '10px',
          top: 'calc(100% + 5px)',
          color: themeVariables.getPropertyValue('--text-color')
        }),
        container: () => ({
          position: 'relative',
          cursor: 'pointer'
        }),
        option: () => ({
          padding: '10px 20px',
          cursor: 'pointer',
          
        }),
        singleValue: () => ({
          color: themeVariables.getPropertyValue('--text-color'),
          padding: '10px 12px'
        }),
        placeholder: () => ({
          padding: '10px 12px', 
          color: themeVariables.getPropertyValue('--text-color')
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        indicatorsContainer: () => ({
          width: '16px',
          height: '16px',
          marginRight: '20px',
          color: themeVariables.getPropertyValue('--text-color')
        })
    }

    function handleChange(selectedOption) {
      let stringified = JSON.stringify(selectedOption);
      setRegionFilter(selectedOption);
      if(selectedOption.value !== null) {
        let filteredOptions = countries.filter(country => country.region.toLowerCase() === selectedOption.value.toLowerCase());
        updateCountries(_.sortBy(filteredOptions, [function(country) { return country.name }]));
      } else {
        updateCountries(countries);
      }
    }

    function dropdownIndicator(props) {
      let isOpen = props.selectProps.menuIsOpen;
      if (isOpen) {
        return <FaAngleUp />
      } else {
        return <FaAngleDown />
      }
    }

    function searchBar(e) {
      let value = e.target.value;
      let filteredOptions = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
      updateCountries(_.sortBy(filteredOptions, [function(country) {return country.name}]));
    }

    return (
        <div className="filters">
            <div className="search">
                <FaSearch className="searchIcon"/>
                <input type="text" placeholder="Search for a country..." onChange={(e) => {searchBar(e)}} />
            </div>
            <Dropdown 
            options={filters}
            styles={dropdownStyles}
            placeholder="Filter by Region"
            value={regionFilter}
            onChange={handleChange}
            components={{ DropdownIndicator: dropdownIndicator }}
            />
      </div>
    )
}
