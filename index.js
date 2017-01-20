const promise = require('bluebird');
const exec = promise.promisify(require('child_process').exec);
const fs = require('fs');

const file = fs.readFileSync('./test.json');
const tests = JSON.parse(file.toString());

exec(`./speedtest.py --json`)
.then((data) => {
  (tests.tests.length >= 1000) && tests.tests.shift();
  tests.tests.push(JSON.parse(data));
  fs.writeFileSync('./test.json', JSON.stringify(tests, null, 2));
}).catch((err) => {
  console.log(err);
});
