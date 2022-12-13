import './css/styles.css';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const url = 'https://restcountries.com/v3.1/all';

fetch(url)
    .then(response => {
        if (!response.ok) throw new Error('There was an error');

        return response.json();
    })
    .then(body => {
        const country = body;
        console.log(country[200].capital);
        console.log(typeof body );
        const poland = body.find(({ cca2 }) => cca2 === "PL");
        console.log(poland);
    }
       
  )
  .catch(error => console.error(error));

searchBox.addEventListener('input', () => {
  fetchCountries()
    .then(body => {
      console.log(body);
    })
    .catch(error => console.log(error));
});

function fetchCountries() {
  return fetch('https://restcountries.com/v3.1/name/peru').then(response => {
    if (!response.ok) throw new Error('There was an error');

    return response.json();
  });
}

function renderCountries() {

}
//     .then(body => {
//        // console.log(body);
//         const poland = body.find(({ capital }) => capital === 'Warsaw');
//         console.log(poland);
//     })
//   .catch(error => console.error(error))

const DEBOUNCE_DELAY = 300;
