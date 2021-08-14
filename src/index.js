import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './themes-variables.css';
import Header from './components/header';
import Filters from './components/filters';
import CountriesGrid from './components/CountriesGrid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Details from './details';
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { update } from './redux/countries';
const _ = require('lodash');

function Main() {
  const dispatch = useDispatch();

  // Theme
  const theme = useSelector((state) => state.theme.value);
  document.body.classList = theme;

  // Countries
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

  // Filters
  var [filteredCountries, updateCountries] = useState(countries);
  useEffect(() => {
    updateCountries(countries);
  }, [countries])
  const [regionFilter, setRegionFilter] = useState(null);

  return (
    <React.Fragment>
      <Header theme={theme} />
      <div className="main">
        <div className="top">
          <Filters 
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
          countries={countries}
          updateCountries={updateCountries}
          />
        </div>
        <div className="cards">
          <CountriesGrid countries={filteredCountries} />
        </div>
      </div>
    </React.Fragment>
  )
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/country/:countryCode" component={(props) => {
        return (<Details 
          countryCode={props.match.params.countryCode}
           />)
      }} />
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);