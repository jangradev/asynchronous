'use strict';

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const getPosition2 = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const whereIam3 = async function () {
  try {
    const pos = await getPosition2();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    //if (!resGo.ok) throw new Error('🌟🐞 Too many request 🐞🌟');
    const dataGeo = await resGo.json();

    return `returned data ${dataGeo.state} from asyn function`;
  } catch (err) {
    console.error(`🌟🐞 cought by internal catch method ${err} 🐞🌟`);
    throw err;
  }
};
whereIam3();

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

console.log('1: will get location');
whereIam3()
  .then(city => console.log(city))
  .catch(err =>
    console.error(
      `2: Also caught by external catch method 🌟🐞 ${err.message} 🐞🌟`
    )
  )
  .finally(() => console.log('3: finished getting location'));

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
/*IIFE -Immediately invoked function Expression */

(async function () {
  try {
    const data = await whereIam3();
    console.log(city);
  } catch (err) {
    console.log(`2: manually returned error 🌟🐞 ${err.message} 🐞🌟`);
  }
  console.log('3: finished getting location');
})();

/* 
1: will get location
2: manually returned error 🌟🐞 User denied Geolocation 🐞🌟
3: finished getting location
*/
//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

const getJSON = function (url, errMSG = 'Spmething went worng') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Error faced`);
    return response.json();
  });
};

const getCountries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3/name/${c1}`),
      getJSON(`https://restcountries.com/v3/name/${c2}`),
      getJSON(`https://restcountries.com/v3/name/${c3}`),
    ]);
    console.log(data);
    console.log(
      data.map(d => {
        const [ele] = d[0].capital;
        return ele;
      })
    );
  } catch (err) {
    console.error(err);
  }
};
getCountries('portugal', 'canada', 'tanzania');

/* (3) [Array(1), Array(1), Array(1)]
0: [{…}]
1: [{…}]
2: [{…}]
length: 3 */

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

/* 262. Other Promise Combinators: race, allSettled and any */

(async function () {
  const res = await Promise.race([
    getJSON('https://restcountries.com/v3/name/itals'),
    getJSON('https://restcountries.com/v3/name/egypt'),
    getJSON('https://restcountries.com/v3/name/portugal'),
  ]);
  console.log(res[0]);
})();

/* {name: {…}, tld: Array(1), cca2: 'IT', ccn3: '380', cca3: 'ITA', …} */
/* as italy loads first so wins this race */
//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request Timeout'));
    }, sec * 1000);
  });
};

Promise.race([getJSON('https://restcountries.com/v3/name/italy'), timeout(2)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

/*
  {name: {…}, tld: Array(1), cca2: 'IT', ccn3: '380', cca3: 'ITA', …}
  */
//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Sucess'),
  Promise.reject('Error in fetching'),
  Promise.resolve('another sucess'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/*
(3) [{…}, {…}, {…}]
0: {status: 'fulfilled', value: 'Sucess'}
1: {status: 'rejected', reason: 'Error in fetching'}
2: {status: 'fulfilled', value: 'another sucess'}
length: 3
[[Prototype]]: Array(0) */

Promise.all([
  Promise.resolve('Sucess'),
  Promise.resolve('Error1 in fetching'),
  Promise.resolve('Error2 in fetching'),
  Promise.resolve('another sucess'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/* 
(4) ['Sucess', 'Error1 in fetching', 'Error2 in fetching', 'another sucess']
*/

Promise.all([
  Promise.resolve('Sucess'),
  Promise.resolve('Error1 in fetching'),
  Promise.reject('Error2 in fetching'),
  Promise.resolve('another sucess'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
/* 
Error2 in fetching
*/

Promise.all([
  Promise.resolve('Sucess'),
  Promise.resolve('Error1 in fetching'),
  Promise.reject('Error2 in fetching'),
  Promise.reject('another sucess'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/* Error2 in fetching */

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
// Promise.any[ES2021];
Promise.any([
  Promise.resolve('another sucess1'),
  Promise.reject('Error in fetching'),
  Promise.resolve('another sucess2'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// another sucess1

Promise.any([
  Promise.reject('another sucess1'),
  Promise.reject('Error in fetching'),
  Promise.resolve('another sucess2'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/* another sucess2 */

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const imgContainer = document.querySelector('.container');
let currImg;
let imgArr;

const wait = function (sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, sec * 1000);
  });
};
//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const createImage = function (imgArr) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgArr;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('🌟🌟 Image loading Error 🌟🌟'));
      reject(img);
    });
  });
};

//createImage('img/img-1.jpg');

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');

    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    throw err;
  }
};
loadNPause();

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
const loadAll = async function (imgArr) {
  try {
    let imgA = imgArr.map(async ele => await createImage(ele));
    console.log(imgA);
    const imgsEL = await Promise.all(imgA);
    console.log(imgsEL);
    imgsEL.forEach(img => img.classList.add('parallel'));

    console.log('completed');
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

//➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 10000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}

f1();
