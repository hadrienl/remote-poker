var exec = require('child_process').exec,
  watch = require('watch'),
  backend;

function restart () {
  if (backend) {
    console.log('Restarting server');
    backend.kill('SIGHUP');
    setTimeout(function () {
      start();
    }, 200);
  } else {
    start();
  }
}

function start () {
  exec('node ./run-scripts/build-server.js', function () {
    console.log('go start');
    backend = exec('node server/dist');
    backend.stdout.pipe(process.stdout, { end: false });
    backend.stderr.pipe(process.stderr, { end: false });
  });
}

watch.watchTree(__dirname + '/../server/src', { ignoreDotFiles: true }, function (f, curr, prev) {
  restart();
});

process.on('exit', function () {
  backend.stdin.end();
});
