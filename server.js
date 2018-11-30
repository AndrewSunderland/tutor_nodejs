var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var tutorData = require('./tutorData');
var fs = require('fs');

var tutorHolder = [
        {
        }
    ];



var app = express();

var port = 8000;

app.engine('handlebars',exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//not working to render dynamic posts from postData JSON file
app.get('/',function(req,res){

    //**********  This will write/read to JSON */
    fs.readFile('tutorData.json','utf8',function readFileCallBack(err,data){
        if(err){
            throw err;
        }else{
            tutorHolder = JSON.parse(data); //reads the current JSON data, parses to obj
            tutorHolder.push({"photoURL": "http://placekitten.com/322/322",
            "profile": "Pushed kitty",
            "price": "50",
            "subject": "Science",
            "name": "Richard Dixon"});//pushes this data to the obj
            var json = JSON.stringify(tutorHolder); //converts the obj back to JSON
            fs.writeFile('tutorData.json', json, function(err){
                if (err){
                    return console.log(err);
                }
                console.log("File was written to");
            }); //write back to JSON
        }
    });

    console.log("REQUESTED INDEX");
  res.status(200).render('becomeTutor', {
      photos: tutorData
  });
});

app.get('/about', function (req, res) {
   res.status(200).render('about');
   console.log('This is the about page.');
});

app.get('*', function (req, res) {
  res.status(404);
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
