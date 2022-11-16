import 'isomorphic-fetch';
import { argv } from 'node:process';

const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const sendFetch = (type, tgAPIKey, tgChatId, text) => {
  let typeEvent;
  let typeObject;
  type === 'message'
    ? ((typeEvent = 'sendMessage'), (typeObject = 'text'))
    : type === 'animation'
    ? ((typeEvent = 'sendAnimation'), (typeObject = 'animation'))
    : null;
  return fetch(
    'https://api.telegram.org/' +
      tgAPIKey +
      '/' +
      typeEvent +
      '?chat_id=' +
      tgChatId +
      '&' +
      typeObject +
      '=' +
      text,
    { method: 'POST' }
  );
};

let listWinner = ['winner', 'god-job', 'nice', 'my-love'];
let listFailure = ['loser', 'failure', 'idiot', 'not-today', 'wrong'];
let listError = ['error', 'pls-check'];

let result;
let projectTitle;
let projectUrl;
let branch;
let commitTitle;
let userName;
let tgAPIKey;
let tgChatId;
let text;

let enteredType;
let search_term;
let lmt;
let apikey;

let stage = argv[2];

const callFetch = (stage) => {
  if (stage === 'start' || stage === 'end-text') {
    if (stage === 'start') {
      projectTitle = argv[3];
      projectUrl = argv[4];
      branch = argv[5];
      commitTitle = argv[6];
      userName = argv[7];
      tgAPIKey = argv[8];
      tgChatId = argv[9];
      text =
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
    } else if (stage === 'end-text') {
      result = argv[3];
      projectTitle = argv[4];
      startText = '';
      result == 'good'
        ? (startText = '✅ CI: new version was uploaded %0A project: ')
        : result == 'failure'
        ? (startText = '❌ Failure pipeline %0A project: ')
        : null;
      projectUrl = argv[5];
      branch = argv[7];
      commitTitle = argv[6];
      userName = argv[8];
      tgAPIKey = argv[9];
      tgChatId = argv[10];
      text =
        '' +
        startText +
        projectTitle +
        '%0A URL: ' +
        projectUrl +
        '%0A branch is: ' +
        branch +
        '%0A commit-title: ' +
        commitTitle +
        '%0A who started: ' +
        userName;
    }
    sendFetch(message, tgAPIKey, tgChatId, text);
  } else if (stage === 'end-gif') {
    enteredType = argv[3];
    search_term = argv[3];
    lmt = argv[4];
    apikey = argv[5];
    tgAPIKey = argv[6];
    tgChatId = argv[7];
    enteredType === 'winner'
      ? (search_term = listWinner[getRandomArbitrary(0, listWinner.length - 1)])
      : enteredType === 'failure'
      ? (search_term =
          listFailure[getRandomArbitrary(0, listWinner.length - 1)])
      : (search_term = listError[getRandomArbitrary(0, listWinner.length - 1)]);

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
        return sendFetch(message, tgAPIKey, tgChatId, finalGif);
      });
  }
};

callFetch(stage);
