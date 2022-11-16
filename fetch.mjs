import 'isomorphic-fetch';
import { argv } from 'node:process';

const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let listWinner = ['winner', 'god-job', 'nice', 'my-love'];
let listFailure = ['loser', 'failure', 'idiot', 'not-today', 'wrong'];
let listError = ['error', 'pls-check'];

let enteredType = argv[2];
let search_term = argv[2];

if (enteredType === 'winner') {
  search_term = listWinner[getRandomArbitrary(0, listWinner.length - 1)];
} else if (enteredType === 'failure') {
  search_term = listFailure[getRandomArbitrary(0, listWinner.length - 1)];
} else {
  search_term = listError[getRandomArbitrary(0, listWinner.length - 1)];
}

console.log(search_term);

let lmt = argv[3];
let apikey = argv[4];
let tgAPIKey = argv[5];
let tgChatId = argv[6];
let listOfGifs = [];
let finalGif;

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
      'https://api.telegram.org/' +
        tgAPIKey +
        '/sendAnimation?chat_id=' +
        tgChatId +
        '&animation=' +
        finalGif,
      { method: 'POST' }
    );
  });
