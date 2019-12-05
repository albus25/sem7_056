var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});

mongoose.connect('mongodb://localhost:27017/studentDB',{useNewUrlParser : true});

var db = mongoose.connection;

app.use(express.static('public'));
app.set("view engine","pug");
app.set("views",__dirname);

db.on('error',console.error.bind(console,'Connection Error'));

db.once('open',function(){
	console.log('Connection Successful!');

	var StudentSchema = mongoose.Schema({
		studentName : String,
		contactNo : Number,
		email : String,
		city : String,
		gender : String
	});

	var Stud = mongoose.model('Student',StudentSchema,'tblStud');

	app.get('/showStudent',function(req,res){
		Stud.find(function(err,result){
			if(err)
				throw err;
		console.log(result);
		res.render("showStudent.pug",{"data":result});
		});
	});

	app.get('/addStudent',function(req,res){
		res.render("addStudent.pug",{data:""});
	});

	app.get('/editStudent/:id',function(req,res){
		var cr = {_id:req.params.id};
		Stud.findOne(cr,function(err,result){
			if(err)
				throw err;
			console.log(result);
			res.render("addStudent.pug",{"data":result});
		});
	});

	app.get('/deleteStudent/:id',function(req,res){
		var cr = {_id:req.params.id};
		Stud.deleteOne(cr,function(err){
			if(err)
				throw err;
			console.log("Deleted");
		});
		res.redirect("/showStudent");
	});

	app.post('/submitData',urlEncodedParser,function(req,res){
		var id = req.body.txtID;
		var studentName = req.body.txtName;
		var contactNo = req.body.txtCno;
		var email = req.body.txtEmail;
		var city = req.body.comboCity;
		var gender = req.body.gender;
		console.log(id);
		if(id.length > 0)
		{
			var cr = {_id:id};
			var newData = {studentName:studentName,contactNo:contactNo,email:email,city:city,gender:gender};
			Stud.updateOne(cr,newData,function(err,result){
				if(err)
					throw err;
				console.log(studentName+" Updated");
			});
		}
		else
		{
			var s1 = new Stud({studentName:studentName,contactNo:contactNo,email:email,city:city,gender:gender});
			s1.save(function(err,stud){
				if(err)
					throw err;
				console.log(stud.studentName+" Inserted");
			});
		}
		res.redirect("/showStudent");
	});
});

var server = app.listen(3333,function(){
	console.log("%s %s",server.address().address,server.address().port);
});