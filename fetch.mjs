import 'isomorphic-fetch';
import { argv } from 'node:process';

let listWinner = ['winner', 'god-job', 'nice', 'my-love'];
let listFailure = ['loser', 'failure', 'idiot', 'not-today', 'wrong'];
let listError = ['error', 'pls-check'];

const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

let stage = argv[2];

if (stage === 'start') {
  let projectTitle = argv[3];
  let projectUrl = argv[4];
  let branch = argv[5];
  let commitTitle = argv[6];
  let userName = argv[7];
  let tgAPIKey = argv[8];
  let tgChatId = argv[9];
  let text =
    '⏩ Start pipeline%0Aproject: ' +
    projectTitle +
    '%0AURL: ' +
    projectUrl +
    '%0Abranch is: ' +
    branch +
    '%0Acommit-title: ' +
    commitTitle +
    '%0Awho started: ' +
    userName;
  fetch(
    'https://api.telegram.org/' +
      tgAPIKey +
      '/sendMessage?chat_id=' +
      tgChatId +
      '&text=' +
      text,
    { method: 'POST' }
  );
} else if (stage === 'end-gif') {
  let enteredType = argv[3];
  let search_term = argv[3];
  let lmt = argv[4];
  let apikey = argv[5];
  let tgAPIKey = argv[6];
  let tgChatId = argv[7];
  if (enteredType === 'winner') {
    search_term = listWinner[getRandomArbitrary(0, listWinner.length - 1)];
  } else if (enteredType === 'failure') {
    search_term = listFailure[getRandomArbitrary(0, listWinner.length - 1)];
  } else {
    search_term = listError[getRandomArbitrary(0, listWinner.length - 1)];
  }

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
} else if (stage === 'end-text') {
  let projectTitle = argv[3];
  let result = argv[4];
  let startText = '';
  if (result === 'good') {
    startText = '✅ CI: new version was uploaded%0Aproject: ';
  } else if (result === 'failure') {
    startText = '❌ Failure pipeline%0Aproject: ';
  }
  let projectUrl = argv[5];
  let branch = argv[6];
  let commitTitle = argv[7];
  let userName = argv[8];
  let tgAPIKey = argv[9];
  let tgChatId = argv[10];
  let text =
    startText +
    projectTitle +
    '%0AURL: ' +
    projectUrl +
    '%0Abranch is: ' +
    branch +
    '%0Acommit-title: ' +
    commitTitle +
    '%0Awho started: ' +
    userName;
  fetch(
    'https://api.telegram.org/' +
      tgAPIKey +
      '/sendMessage?chat_id=' +
      tgChatId +
      '&text=' +
      text,
    { method: 'POST' }
  );
}
