//Importing node modules 
var express= require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Adding a route to authors  
var authors = require('./authors.js');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Calling the middleware 
app.use('/authors', authors);
app.use(cookieParser());

// Default endpoint
app.get('/',function(req,res){
	res.send(Template('Hello','Ashwin VC',''));
});

// Forbidden Access
app.get('/robots.txt',function(req,res){
	res.status(403).send(Template('Access Forbidden','ERROR 403',''));
});

// Rendering a HTML Page
app.get('/html',function(req,res){
	res.sendFile(path.join(__dirname,'./test.html'))
	console.log('SUCCESS Rendered page test.html');
});

// Text Input Endpoint
app.get('/input',function(req,res){
	res.sendFile(path.join(__dirname,'./form.html'));
});

//Response to POST request from input page
app.post('/input',urlencodedParser, function(req,res){ 
	console.log('DATA Received: ', req.body);
	res.send(Template('Data Entered:','Name: '+ req.body.name, 'Message: '+req.body.message))
});

//Cookies Set Endpoint 
app.get('/setcookie',function(req,res){
	if(JSON.stringify(req.cookies)==='{}'){
		res.cookie('name','Ashwin VC');
		res.cookie('age','18');
		res.send(Template('Cookies Set','',''));}
	else {
		res.send(Template('Cookies Already Set','',''));
	}
});

//Cookies Get Endpoint
app.get('/getcookies', function(req,res){
	console.log('Cookies: ', req.cookies);
	if(JSON.stringify(req.cookies)==='{}'){
		res.send(Template('No Cookies to display','',''));	
	}
	else{
		res.send(Template('Cookies: ','Name: ' + req.cookies.name,'Age: '+ req.cookies.age));	
	}
	
});

//Server listening to the requests on port 8080
app.listen(8080, function(){
	console.log("Listening to server on port 8080!");
});

//Template which is returned as a response to the GET Requests
function Template(data1,data2,data3){	
	var htmlTemplate= `
		<html>
			<head>
				<link href="/style.css" rel="stylesheet">
			</head>
			<body>
				<div class="container">
					<ol>
						<li><a href='/'>Home </a></li>
						<li><a href='/authors'>Authors </a></li>
						<li><a href='/setcookie'>setCookies </a></li>
						<li><a href='/getcookies'>getCookies </a></li>
						<li><a href='/robots.txt'>Robots </a></li>
						<li><a href='/html'>HTML Webpage </a></li>
						<li><a href='/input'>Input </a></li>
						
					</ol>
				<hr/>
				<h1>
					${data1}
				</h1>
				<h2>
					${data2}
				</h2>
				<h2>
					${data3}
				</h2>		
				</div>
			</body>
		</html>
	`;
	return htmlTemplate;
	}
