#!/usr/bin/env nodejs

var debug = true;

var serverport = 8080;

var http = require('http');
var url = require('url');
var os = require('os');

var mycolor = process.env.COLOR || 'white';
var hostname = os.hostname();


// https://gist.githubusercontent.com/joelpt/3824024/raw/df31dca35b84ff3f2a4a4d8bd21606ae8c671bdd/squirt.js
// The Babylonian Method
// http://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
// @param n - the number to compute the square root of
// @param g - the best guess so far (can omit from initial call)
function squirt(n, g) {
    if (!g) {
        // Take an initial guess at the square root
        g = n / 2.0;
    }
    var d = n / g;              // Divide our guess into the number
    var ng = (d + g) / 2.0;     // Use average of g and d as our new guess
    if (g == ng) {
        // The new guess is the same as the old guess; further guesses
        // can get no more accurate so we return this guess
        return g;
    }
    // Recursively solve for closer and closer approximations of the square root
    return squirt(n, ng);
}

function handleRequest(req, rsp) {
  var burncpu = 0;
  var query = url.parse(req.url, true).query;

  if (debug) {
    console.log((new Date()) + ' Received request for color ' + mycolor + ' on URL ' + req.url);
  }

  if (query.burncpu > 1) {
    var x = 0.0001;
    for (var i = 0; i < query.burncpu; i++) {
      x = squirt(x);
    }
  }

  var font_color = 'black';
  if (mycolor == 'black') {
    font_color = 'white';
  }

  rsp.statusCode = 200;
  rsp.setHeader("Content-Type", "text/html; charset=utf-8");
  rsp.setHeader("X-Processed-By", hostname);

  rsp.write("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\n   \"http://www.w3.org/TR/html4/strict.dtd\">\n");
  rsp.write("<HTML lang=\"en-US\">\n");
  rsp.write("<HEAD>\n<TITLE>" + mycolor + " app</TITLE>\n");
  rsp.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n</HEAD>\n");
  rsp.write("<BODY style=\"color: " + font_color + "; background-color:" + mycolor + ";\">\n");
  rsp.write("<H1>" + mycolor + " app</H1>\n");
  rsp.write("<H2>" + hostname + "</H2>\n");
  rsp.write("<div>" + mycolor + "</div>\n");
  rsp.write("</BODY>\n");
  rsp.write("</HTML>\n");

  rsp.end();
}

var wsrv = http.createServer(handleRequest);

wsrv.listen(serverport, function(){
  console.log("Server listening on port %s for color %s", serverport, mycolor);
});

process.on('SIGTERM', function () {
  wsrv.close(function () {
    process.exit(0);
  });
});
