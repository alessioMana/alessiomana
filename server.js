var http = require("http");
var fs = require("fs");
var url = require("url");

function rispondi(req,res){
    var risorsa = (url.parse(req.url)).pathname;
    var extension = risorsa.split('.');
    console.log(extension[extension.length-1]);
    switch(extension[extension.length-1]){
        case '/':
            fs.readFile("./index.html","utf8",function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"text/html;charset = utf-8"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case '/home':
            fs.readFile("./home.html","utf8",function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"text/html;charset = utf-8"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'html':
            fs.readFile("."+risorsa,"utf8",function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"text/html;charset = utf-8"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'css':
            fs.readFile("."+risorsa,"utf8",function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"text/css;charset = utf-8"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'js':
            fs.readFile("."+risorsa,"utf8",function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"application/javascript;charset = utf-8"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'jpg':
            fs.readFile("."+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"image/jpeg"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'png':
            fs.readFile("."+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"image/png"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'ttf':
            fs.readFile("."+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"font/opentype"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
         case 'woff':
            fs.readFile("."+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"font/opentype"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
         case 'woff2':
            fs.readFile("."+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"font/opentype"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
            
        case 'map':
            fs.readFile("."+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"application/octet-stream"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        case 'ico':
            fs.readFile("./"+risorsa,function(err,content){
               if(!err)
                {
                    var header = {"Content-Type":"image/x-icon"};
                    res.writeHead(200, header);
                    res.end(content);
                }
                else
                    pageNotFound(res);
            });
            break;
        default:
            pageNotFound(res);
    }
}

function pageNotFound(resp)
{
    var header = {"Content-Type":"text/html;charset = utf-8"};
    resp.writeHead(200, header);
    var data = fs.readFileSync("./error.html","utf8");
    resp.end(data);
}

var server = http.createServer(rispondi);
server.listen(443);
