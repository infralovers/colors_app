#!/usr/bin/env nodejs

var debug = true;

var serverport = 8080;

var http = require('http');
var url = require('url');

var mycolor = process.env.COLOR || 'white';

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
  var burncpu = false;
  var query = url.parse(req.url, true).query;

  if (debug) {
    console.log((new Date()) + ' Received request for color ' + mycolor + ' on URL ' + req.url);
  }

  if (query.burncpu) {
    var x = 0.0001;
    for (var i = 0; i < 1000000; i++) {
      x = squirt(x);
    }
  }

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
    rsp.statusCode = 200;

    rsp.write("<HTML>\n");
    rsp.write("<HEAD><TITLE>Default app</TITLE></HEAD>\n");
    rsp.write("<BODY><H1>Default app</H1>\nDefault app</BODY>\n");
    rsp.write("</HTML>\n");
  }

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
