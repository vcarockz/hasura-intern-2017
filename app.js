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
		res.send(Template('Cookies are now set','',''));}
	else {
		res.send(Template('Dont take so much pain buddy...','Cookies have already been set',''));
	}
});

//Cookies Get Endpoint
app.get('/getcookies', function(req,res){
	console.log('Cookies: ', req.cookies);
	if(JSON.stringify(req.cookies)==='{}'){
		res.send(Template('Alas...No Cookies to display','',''));	
	}
	else{
		res.send(Template('Cookies: ','Name: ' + req.cookies.name,'Age: '+ req.cookies.age));	
	}
	
});

app.get('/delcookie',function(req,res){
	if(JSON.stringify(req.cookies)==='{}'){
		res.send(Template('Nothing to delete... !','Maybe you forgot to set the cookies first xD',''));
	}
	else {
		res.clearCookie('name');
		res.clearCookie('age');
		res.send(Template('Deleted all cookies','',''));
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
				<style>
				/* Add a black background color to the top navigation */
				.topnav {
					background-color: #333;
					overflow: hidden;
				}
				
				/* Style the links inside the navigation bar */
				.topnav a {
					float: left;
					color: #f2f2f2;
					text-align: center;
					padding: 14px 16px;
					text-decoration: none;
					font-size: 17px;
				}
				
				/* Change the color of links on hover */
				.topnav a:hover {
					background-color: #ddd;
					color: black;
				}
				
				/* Add a color to the active/current link */
				.topnav a.active {
					background-color: #4CAF50;
					color: white;
				}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="topnav" id="myTopnav">
					<a class="active" href='/'>Home </a>
					<a href='/authors'>Authors </a>
					<a href='/setcookie'>SetCookies </a>
					<a href='/getcookies'>GetCookies </a>
					<a href='/delcookie'>DeleteCookies </a>
					<a href='/robots.txt'>Robots </a>
					<a href='/html'>HTML_Webpage </a>
					<a href='/input'>Input </a>
				  </div>
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
