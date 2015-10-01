var exec = require('child_process').exec,
    backend, frontend;

backend = exec('npm run watch-server');
backend.stdout.pipe(process.stdout, { end: false });
backend.stderr.pipe(process.stderr, { end: false });

frontend = exec('npm run start-front');
frontend.stdout.pipe(process.stdout, { end: false });
frontend.stderr.pipe(process.stderr, { end: false });

process.on('exit', function () {
  backend.stdin.end();
  frontend.stdin.end();
});
