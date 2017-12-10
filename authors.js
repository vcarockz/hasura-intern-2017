//Importing node modules
var express = require('express');
var router = express.Router();
var request = require('request');

//Global vars declared
var nameArray ;	
var postArray ;
var final= [];




router.get('/',function(req,res){

request('https://jsonplaceholder.typicode.com/users',{json: true},function (error, response, body) {
   nameArray = body;
   request('https://jsonplaceholder.typicode.com/posts',{json: true},function (error, response, body) {
   		postArray = body;
   		
	for (var i = 0 ; i < nameArray.length ; i++) {
		var count = 0;
		for(var j = 0; j< postArray.length ; j++){
			if(nameArray[i].id==postArray[j].userId)
				count+=1;
		}
		console.log(nameArray[i].name+'-->'+count+"\n");
		var object = {
			name: nameArray[i].name,
			count: count
		}
		final.push(object)
		
	}
		res.send(`<html>
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
			<div>
			<pre>
			NAME               			  		POSTS            <br> 
			${final[0].name}    				${final[0].count}<br>
			${final[1].name}     				${final[1].count}<br>
			${final[2].name}     				${final[2].count}<br>
			${final[3].name}     				${final[3].count}<br>
			${final[4].name}     				${final[4].count}<br>
			${final[5].name}     				${final[5].count}<br>
			${final[6].name}     				${final[6].count}<br>
			${final[7].name}     				${final[7].count}<br>
			${final[8].name}     				${final[8].count}<br>
			${final[9].name}     				${final[9].count}<br>
			</pre> 	
			</div>	
			</div>
		</body>
	</html>`);
	});	
});



});


module.exports = router;