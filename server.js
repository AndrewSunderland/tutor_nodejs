var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');


var app = express();

var port = 8000;

app.engine('handlebars',exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

//not working to render dynamic posts from postData JSON file
app.get('/',function(req,res){
    console.log("REQUESTED INDEX");
  res.status(200).render('becomeTutor');
});

app.get('*', function (req, res) {
  res.status(404);
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
