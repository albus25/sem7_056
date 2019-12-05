const websocket = require('ws');
var http = require('http');
var url = require('url');
var st = require('node-static');
var fileserver = new st.Server('./views');

var httpserver = http.createServer( (req,res) => {
        fileserver.serve(req,res)
}).listen(3000, () => {
    console.log("server is running");
})

const ws = new websocket.Server( { port:4000 });

ws.on('connection', (ws1) => {
    ws1.send("hello client")
    ws1.on('message', msg => {
        console.log("receved msg",msg)
        ws1.send('received'+msg)
    });
});