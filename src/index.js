import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  debounce(() => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    let name = searchBox.value.trim();

    fetchCountries(name)
      .then(response => {
        // console.log(response);
        if (response.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (response.length > 1) {
          countryList.insertAdjacentHTML(
            'beforeend',
            response
              .map(
                element => `<li class="country-list__item">
					<img class="country-list__flag" src="${element.flags.svg}" alt="${element.name.official}">
					<p>${element.name.official}</p>
					</li>`
              )
              .join('')
          );
        } else {
          countryInfo.insertAdjacentHTML(
            'beforeend',
            `<ul class="country-info">
					<li class="country-list__item">
						<img class="country-list__flag" src="${response[0].flags.svg}" alt="${
              response[0].name.official
            }">
						<h1>${response[0].name.official}</h1></li>
					<li class="country-list__item"><p><b>Capital:</b> ${
            response[0].capital
          }</p></li>
					<li class="country-list__item"><p><b>Population:</b> ${
            response[0].population
          }</p></li>
					<li class="country-list__item"><p><b>Languages: </b>${Object.values(
            response[0].languages
          ).join(', ')}</p></li>
					</ul>`
          );
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }, DEBOUNCE_DELAY)
);
