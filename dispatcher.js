var url = require("url");
var fs = require("fs");

var listener = {
    resource: "",
    callback:function(request,response){}
};

var Dispatcher = function(){
    //property prompt per console
    this.prompt = ">_";
    
    //vettore list associativo per le richieste ricevute
    this.list = {
        GET:[],
        POST:[]
    };
    
    this.addListener = function(method, resource, callback){
        this.list[method].push({"callback": callback, "resource": resource});
    };
    
    this.showList = function(){
        console.log("\nStart Listeners List");
        for(method in this.list){
            console.log("\n\tMethod: " + method + ", Length: " + this.list[method].length);
            for(listener in this.list[method]){
                console.log("\n\t\tListener: " + this.list[method][listener].resource);
            }
        }
        console.log("\nEnd");
    };
};

//metodo Dispatch
Dispatcher.prototype.dispatch = function(request, response){
    var method = request.method.toUpperCase();
    var resource = url.parse(request.url).pathname;
    console.log(this.prompt + method + ": " + resource);
    
    request.GETparameters = url.parse(request.url, true).query;
    request.POSTparameters = require("querystring").parse(request.POSTparameters);
    
    if(method == "GET")
        console.log(request.GETparameters);
    else
        console.log(request.POSTparameters);
    
    var found = false;
    var listeners = this.list[method];
    
    for(var i in listeners){
        if(resource == listeners[i].resource){
            listeners[i].callback(request,response);
            found = true;
            break;
        }
    }
    if(!found){
        this.errorListener(response);
    }
}

Dispatcher.prototype.errorListener = function(response){
    var header = {"Content-type":"text/html"};
    response.writeHead(404,header);
    var data = fs.readFileSync("./error.html","utf8");
    response.end(data);
}

Dispatcher.prototype.parsePostParameters = function(request, response, callback){
    var body = "";
    
    request.on("data", function(data){
        body += data; 
    });
    
    request.on("end", function(){
        request.POSTparameters = body;
        callback(request, response);
    });
}

var dispatcher = new Dispatcher();
module.exports = dispatcher;
