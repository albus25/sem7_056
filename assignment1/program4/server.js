const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 4000});

ws.on('connection', ws1 => {
    ws1.on('message', msg => {
        console.log(msg);
    });
    ws1.send('hello client');
});