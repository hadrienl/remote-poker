var exec = require('child_process').exec;

var build = exec('./node_modules/.bin/babel server/src --out-dir server/dist');
build.stdout.pipe(process.stdout, { end: false });
build.stderr.pipe(process.stderr, { end: false });

process.on('exit', function () {
  build.stdin.end();
});
