'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

const renderCountry = function (data, languages, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags[0]}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>people</p>
      <p class="country__row"><span>🍁</span>${data.capital[0]}</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
  // comment out due to we used finally method ()
};

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const firstLang = function (data) {
  const speak = data.languages;
  const lang = speak[Object.keys(speak)[0]];
  return lang;
};
//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
  // comment out due to we used finally method ()
};

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

// this button help to reload pages when network is not available
btn.addEventListener('click', function () {
  getCountryDataChaining('Bharat');
  getCountryDataChaining('Australia');
  //getCountryDataChaining('123145dfgsgdfhfdahfb');
});

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
/* 250. Handling Rejected Promises */

const getCountryDataChaining = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3/name/${country}`) // 💥
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      if (data.status === 404)
        throw new Error(`Countary not found ${data.status}`);
      console.log(data[0].hasOwnProperty('borders'));

      const neighbour = data[0].borders[0];
      console.log(neighbour);

      //const neighbour='bnskhfk';
      if (!neighbour) console.log('No neighbour');
      const lang = firstLang(data[0]);
      renderCountry(data[0], lang);

      return fetch(`https://restcountries.com/v3/alpha/${neighbour}`); // 💥
    })
    // above fetch must be include in the call back fn of first promises
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      if (data.status === 400) throw new Error('Neighbour Countary not found');

      const lang = firstLang(data[0]);
      renderCountry(data[0], lang, 'neighbour');
    }) // received neighbour country data via promises
    .catch(err => {
      console.log(`💥💥💥 ${err} 💥💥💥⚡`);
      renderError(
        `something went wrong 💥💥💥 ${err.message} 💥💥💥 .Try again`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

/*
GET https://restcountries.com/v3/name/Bharat 
net::ERR_INTERNET_DISCONNECTED 200

TypeError: Failed to fetch
    at getCountryDataChaining (script.js:264)
    at HTMLButtonElement.<anonymous> (script.js:255) */

/* TypeError: Failed to fetch💥💥💥⚡ 
    this is err.message ---> Failed to fetch */

// getCountryDataChaining('sfkdjsg');
/*💥💥💥 TypeError: Cannot read properties of undefined (reading 'borders') 💥💥💥⚡ */

/* when
const neighbour='bnskhfk'; 
// 💥💥💥 Error:  Neighbour Countary not found  💥💥💥⚡ */

/*
  Response {type: 'cors', url: 'https://restcountries.com/v3/name/Australia', redirected: false, status: 200, ok: true, …}
  {name: {…}, tld: Array(1), cca2: 'AU', ccn3: '036', cca3: 'AUS', …}
  false
  💥💥💥 TypeError: Cannot read properties of undefined (reading '0') 💥💥💥⚡
  
  
  Response {type: 'cors', url: 'https://restcountries.com/v3/name/Bharat', redirected: false, status: 200, ok: true, …}
  {name: {…}, tld: Array(1), cca2: 'IN', ccn3: '356', cca3: 'IND', …}
  true
  BGD
  Response {type: 'cors', url: 'https://restcountries.com/v3/alpha/BGD', redirected: false, status: 200, ok: true, …}
  {name: {…}, tld: Array(1), cca2: 'BD', ccn3: '050', cca3: 'BGD', …}
*/
