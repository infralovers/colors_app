#!/usr/bin/env nodejs

var debug = true;

var serverport = 8080;

var http = require('http');
var mycolor = process.env.COLOR || 'white';

function handleRequest(req, rsp) {
  if (debug) {
    console.log((new Date()) + ' Received request for color ' + mycolor + ' on URL ' + req.url);
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
