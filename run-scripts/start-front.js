var exec = require('child_process').exec,
  frontend;

frontend = exec('gulp watch --color');
frontend.stdout.pipe(process.stdout, { end: false });
frontend.stderr.pipe(process.stderr, { end: false });

process.on('exit', function () {
  frontend.stdin.end();
});
