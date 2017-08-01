#!/usr/bin/env nodejs

var debug = true;

var serverport = 8080;
var colors = [
	"black",
	"blue",
	"brown",
	"green",
	"red",
	"white",
	"yellow",
];

var http = require('http');
var url = require('url');

function handleRequest(req, rsp) {
  if (debug) {
    console.log((new Date()) + ' Received request for ' + req.url);
  }

  var host = req.headers['host'];
  var url_parts = url.parse(req.url, true);
  var path = url_parts.path;

  var mycolor = '';

  for (index = 0; index < colors.length; ++index) {
    if (host.indexOf(colors[index] + '.') > -1) {
      mycolor = colors[index];
      break;
    }
    if (path.indexOf(colors[index] + '/') > -1) {
      mycolor = colors[index];
      break;
    }
  };

  if (mycolor != '') {
    var font_color = 'black';
    if (mycolor == 'black') {
      font_color = 'white';
    }

    rsp.statusCode = 200;

    rsp.write("<HTML>\n");
    rsp.write("<HEAD><TITLE>" + mycolor + " app</TITLE></HEAD>\n");
    rsp.write("<BODY style=\"color: " + font_color + "; background-color:" + mycolor + ";\"><H1>" + mycolor + " app</H1>\n" + mycolor + "</BODY>\n");
    rsp.write("</HTML>\n");
  }
  else {
    rsp.statusCode = 404;
  }

  rsp.end();
}

var wsrv = http.createServer(handleRequest);

wsrv.listen(serverport, function(){
  console.log("Server listening on port %s", serverport);
});
