import Express from 'express';
import fs from 'fs';
import github from './middleware/github';

const app = Express();
const port = 3000;

app.use('/node_modules', Express.static('node_modules'));
app.use('/app', Express.static('app'));
app.use('/public', Express.static('public'));

app.get('/', function(req, res) {
  fs.readFile('index.html', function read(err, data) {
      if (err) {
          throw err;
      }
      res.send(data.toString());
  });
});

app.get('/api', github);

const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
