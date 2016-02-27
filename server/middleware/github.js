import Promise from 'promise';
import repo from './repo';

function github(req, resp) {

  // Create array of requested repos
  let repos = req.query.repos;
  if (repos) {
    let repoArray = repos.split(',');

    // create array of Promises, each returning key/value object of repo->string
    let promiseArray = [];
    repoArray.forEach(function (repName) {
      promiseArray.push(repo(repName));
    });

    Promise.all(promiseArray)
      .then(function (res) {
         resp.setHeader('Access-Control-Allow-Origin', '*');
         resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
         resp.setHeader('Content-Type', 'application/json');
         return resp.send(JSON.stringify({data: res}, null, 3));
      })
      .catch(function (err) {
        return resp.send('error');
      });

  } else {
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.setHeader('Content-Type', 'application/json');
    return resp.send(JSON.stringify({data: 'no repo'}, null, 3));
  }

}

export default github;
