var express = require('express');  
var app = express(); 
var MongoClient=require('mongodb').MongoClient;
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  ;


var url="mongodb://localhost:27017/studydb";
console.log("Hello");



app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "form.html" );  
});

app.post('/process_login',urlencodedParser,function(req,res){
	var eno=req.body.eno;
	var ename=req.body.name;
	var sal=req.body.sal;
console.log(" eno %s ename %s sal %s",eno,ename,sal);


var obj={eno:eno,ename:ename,sal:sal};

MongoClient.connect(url,function(err,db)
{
	db.collection("emp").insertOne(obj,function(err,res) {
        if (err) throw err;
        console.log("Document inserted");
	db.close();
});
});
res.end();
});
app.listen(8000);

