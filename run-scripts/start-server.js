var exec = require('child_process').exec;

backend = exec('node server/dist');
backend.stdout.pipe(process.stdout, { end: false });
backend.stderr.pipe(process.stderr, { end: false });

process.on('exit', function () {
  backend.stdin.end();
});
