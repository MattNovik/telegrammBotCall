import 'isomorphic-fetch';

let apikey = 'AIzaSyA-20iNazzzkkd4Zg4PWxHMucpuh5DUDbI';
let search_term = 'funny';
let lmt = '30';
let listOfGifs = [];
let finalGif;
const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
fetch(
  'https://tenor.googleapis.com/v2/search?q=' +
    search_term +
    '&key=' +
    apikey +
    '&limit=' +
    lmt
)
  .then((response) => response.json())
  .then((data) => {
    data.results.map((item) => {
      listOfGifs.push(item.url);
    });
    finalGif = listOfGifs[getRandomArbitrary(0, listOfGifs.length - 1)];
    return fetch(
      'https://api.telegram.org/bot5674730604:AAEq34bgTEFtfKuGvRSLN55xkSZHPLFuQPM/sendAnimation?chat_id=-832187211&animation=' +
        finalGif,
      { method: 'POST' }
    );
  });
