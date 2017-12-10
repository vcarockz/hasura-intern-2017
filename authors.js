//Importing node modules
var express = require('express');
var router = express.Router();
var request = require('request');

//Global vars declared
var nameArray ;	
var postArray ;





router.get('/',function(req,res){
	var final= [];	


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
		final.push(object.name+'______'+ object.count + 'posts')
		
	}
		res.send(final.join('<br>'));
	});	
});



});


module.exports = router;