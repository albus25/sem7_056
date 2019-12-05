var url = 'ws://localhost:4000/';
var WebSocket = require('ws');
var connection = new WebSocket(url);
connection.onopen = () => {
    connection.send('hello server');
}
connection.onmessage = () => {
    console.log(client.data);
}
connection.onerror = (e) => {
    console.log('ws error'+e);
}