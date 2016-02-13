import fs from 'fs';

function subscribe(req, resp) {
    // make sure has FULL read/write access
    fs.appendFile(__dirname + '/subscribers.txt', req.params.email + ', ', function (err) {
      if (err) throw err;

      return resp.send('complete');
    });
}

export default subscribe;
