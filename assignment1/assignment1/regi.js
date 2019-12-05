var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const { check, validationResult } = require('express-validator');
var MongoClient = require('mongodb').MongoClient;
var urlencodedParser = bodyParser.urlencoded({ extended:false });

var url = "mongodb://localhost:27017/tempDB";
console.log("Welcome");

app.get('/',function(req,res){
	res.sendFile(__dirname +"/"+"registration.html");
});

app.get('/registration',function(req,res){
	res.sendFile(__dirname +"/"+"registration1.html");
});

app.post('/submitForm',urlencodedParser,[

	check('txtName','Name should be greater than 4 words').isLength({min:4}),
	check('txtAge','Age should be numeric').isNumeric(),
	check('txtEmail','Invalid Email').isEmail()

	],function(req,res){

	var errors = validationResult(req);

	var userName = req.body.txtName;
	var age = req.body.txtAge;
	var email = req.body.txtEmail;

	var obj = {userName:userName,age:age,email:email};

	if (!errors.isEmpty()) 
	{
		return res.status(422).json(errors.array());
    }
    else
    {
		MongoClient.connect(url,function(err,db){
			db.collection("tblUser").insertOne(obj,function(err,res){
			if(err)
				throw err;
			console.log("Inserted");
			db.close();
			});
		});
    	return res.status(200).json("success");
    }
	res.end();
});

app.listen(3333);
