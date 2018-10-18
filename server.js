var fs = require("fs");
var http = require("http");

var disp = require("./dispatcher");

disp.addListener("GET", "/", function(request, response){
    fs.readFile("index.html", function(err, data){
       if(!err){
           response.writeHead(200, {"Content-type":"text/html"});
           response.end(data);
       } 
    });
});

disp.addListener("GET", "/risorsaGet", function(request, response){
    response.writeHead(200, {"Content-type":"text/html"});
    response.write("<h1>Richiesta GET Accettata</h1><br>");
    response.end("<a href='/'>Torna alla Home</a>");
});

disp.addListener("POST", "/risorsaPost", function(request, response){
    response.writeHead(200, {"Content-type":"text/html"});
    response.write("<h1>Richiesta POST Accettata</h1><br>");
    response.end("<a href='/'>Torna alla Home</a>");
});

var server = http.createServer(function(req, res){
    if(req.method.toUpperCase() == "POST")
        disp.parsePostParameters(req, res, function(req, res){
            disp.dispatch(req, res);
        });
    else if(req.method.toUpperCase() == "GET")
        disp.dispatch(req, res);
});

server.listen(1240, "localhost");

disp.showList();

console.log("\nServer running on port 1240");