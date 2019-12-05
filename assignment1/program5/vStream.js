var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');

http.createServer(function (req,res) {
	if(req.url != "/dbsuper.mp4"){
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end('<video src="http://localhost:3333/dbsuper.mp4" controls></video>');
	}
	else
	{
		var file = path.resolve(__dirname,"dbsuper.mp4");
		fs.stat(file,function(err,stats){
			if(err) {
				throw err;
			}
			var range = req.headers.range;
			if(!range){
				return res.sendStatus(416);
			}
			var positions = range.replace(/bytes=/,"").split("-");
			var start = parseInt(positions[0],10);
			var total = stats.size;
			var end = positions[1] ? parseInt(positions[1],10) : total - 1;
			var chunksize = (end-start) + 1;

			res.writeHead(206,{
				"Content-Range" : "bytes " + start + "-" + end + "/" + total,
				"Accept-Ranges" : "bytes",
				"Content-Length" : chunksize,
				"Content-Type" : "video/mp4"
			});

			var stream = fs.createReadStream(file,{start:start,end:end}).on("open",function(){
				stream.pipe(res);
			}).on("error",function(err){
				throw err;
			});
		});
	}
}).listen(3333,function(){
	console.log("Server 3333 start");
});