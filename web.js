var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  	//NEW CODE (AJS)
	//
	var fs = require('fs');
	response.send((fs.readFileSync("index.html")).toString());
	// OLD CODE
	// response.send('Hello World 2!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
