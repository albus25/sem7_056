var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

var storage = multer.diskStorage({
	destination : function (req,file,callback) {
		callback(null,'upload')
	},
	filename : function(req,file,callback) {
		console.log(file);
		callback(null,file.originalname)
	}
});

var upload = multer({storage:storage});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/fileUpload',function(req,res){
	res.sendFile(__dirname + "/fileUpload.html");
});

app.post('/singleFile',upload.single('single'),function(req,res,next){
	var file = req.file;
	if(!file){
		var err = new Error('Please Upload File');
		error.httpStatusCode = 400;
		return next(error);
	}
	res.send(file);
});

app.post('/multipleFiles',upload.array('multiple',12),function(req,res,next){
	var files = req.files;
	if(!files){
		var err = new Error('Please Upload File');
		error.httpStatusCode = 400;
		return next(error);
	}
	res.send(files);
});

var server = app.listen(3333,function(){
	console.log("%s %s",server.address().address,server.address().port);
});