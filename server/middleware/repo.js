import request from 'request';
import Promise from 'promise';
import config from '../../config.json';

let accessToken = config.accessToken;
let file = 'CHANGELOG.md';
let headers = {
          'User-Agent': config.userAgentHeader
};

function repo(repo) {

  function getCommitMarkup(lastCommit) {
    return new Promise(function (resolve, reject) {
      let options = {
        url: 'https://api.github.com/repos/' + repo + '/commits/' + lastCommit + '?access_token=' + accessToken,
        headers: headers
      }
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          return resolve(info.files[0].patch);
        } else {
          console.log('sorry error commitMarkup occured');
          return resolve('');
        }
      });
    });
  }


  function getLatestUrl() {
    return new Promise(function (resolve, reject) {
      let options = {
        url: 'https://api.github.com/repos/' + repo + '/commits?path=' + file + '&access_token=' + accessToken,
        headers: headers
      }
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          let lastCommit = info[0].sha;

          return resolve(lastCommit);
        } else {
          console.log('sorry error lastUrl occured');
          return resolve('');
        }
      });
    });
  }

  function parseResult(result) {
    return new Promise(function (resolve, reject) {
      let stringArray = result.split('\n');
      stringArray.splice(0,1);
      // remove first line..commit details
      stringArray = stringArray.filter(function (line) {
        return line.indexOf('+') !== -1
      });
      // remove lines not added
      let parsedString = stringArray.join('\n');
      // join the array back into a single string
      let finalString = parsedString.replace(/\+/g, '');

      return resolve(finalString);
    });
  }

  function returnResult(finalString) {
    return new Promise(function (resolve, reject) {

      let dataObject = {
        repoName: repo,
        update: finalString
      };
      return resolve(dataObject);
    });
  }

  return getLatestUrl()
    .then(getCommitMarkup) // results are chained so resolve(value) pushed as argument into next promise
    .then(parseResult)
    .then(returnResult);

}

export default repo;
