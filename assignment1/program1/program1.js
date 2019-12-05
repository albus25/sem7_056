var net = require('net');
var server = net.createServer((socket)=>{

	var c1 = setInterval(function(){
		var date = new Date();
		var hh = date.getHours();
		var mm = date.getMinutes();
		var ss = date.getSeconds();

		mm = (mm<10?"0":"") + mm;
		ss = (ss<10?"0":"") + ss;

		console.log("Date:"+date);	
		console.log("Time:"+hh+":"+mm+":"+ss);
	},1000);
	socket.end("Hola");
}).on('error',(err)=>{
	throw err;
});
server.listen(3333);

// var emitter = require('events').EventEmitter;

// function clock(){
// 	var e = new emitter();

// 	setTimeout.(function(){
// 		var date = new Date();
// 		var hh = date.getHours();
// 		var mm = date.getMinutes();
// 		var ss = date.getSeconds();

// 		mm = (mm<10?"0":"") + mm;
// 		ss = (ss<10?"0":"") + ss;

// 		console.log("Date:"+date);
// 		console.log("Time:"+hh+":"+mm+":"+ss);

// 		e.emit('Process2');
// 	},500)
// 	return e;
// }

// var clk = clock();

// clk.on("Process1",function(data){
// 	console.log("Process Start"+data);
// });