var express = require('express');

// var modRewrite = require('connect-modrewrite');
var port = process.env.PORT || 9000;

var app = express();
app.use(express.static(__dirname + '/dist'));

/* Rewrite every route to / so Angular can pick it up */
// app.use(modRewrite([
//   '^(.*)$ / [L]'
// ]));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
