// * extends the restify server instance created by ./server.js
//   to provide static asset serving

// require
var path = require('path');
var restify = require('restify');
var server = restify.createServer();
var api = require(path.join(__dirname, 'api'));


// init
//var app = express();
var assetDir = path.join(__dirname, 'dist');
server.use(restify.bodyParser());

// run
api(server);
server.get(/\/?.*/, restify.serveStatic({
  directory: './dist',
  default: 'index.html'
}));

server.listen(8090, function() {
    console.log('%s listening at %s', server.name, server.url);
});

