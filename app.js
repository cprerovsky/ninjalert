
/**
 * Module dependencies.
 */

var express = require('express');
var ninjaBlocks = require('ninja-blocks');
var ninjaSettings = require('./ninja-settings');
var ninja = ninjaBlocks.app(ninjaSettings);

var app = express();

var routes = require('./routes')(ninja, ninjaSettings);
var http = require('http');
var path = require('path');



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/status', routes.status);
app.get('/arm', routes.arm);
app.get('/unarm', routes.unarm);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
