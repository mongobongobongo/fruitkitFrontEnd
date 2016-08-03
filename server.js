var express = require("express");
var fruitkit = express();
var fs = require("fs");

var PORT = process.env.PORT || 3000;


fruitkit.all('/*', function(req, res){
	res.send("");
 });

fruitkit.listen(PORT, function(){
	console.log("Server running on " + PORT);
});