var exec = require('child_process').exec,
    backend, frontend;

backend = exec('node server');
backend.stdout.pipe(process.stdout, { end: false });

frontend = exec('gulp watch --color');
frontend.stdout.pipe(process.stdout, { end: false });

process.on('exit', function () {
  backend.stdin.end();
  frontend.stdin.end();
});
