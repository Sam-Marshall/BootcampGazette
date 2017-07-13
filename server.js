var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require('express');
var path = require("path");

var app = express();

app.set('PORT', process.env.PORT || 8080);

app.use(express.static(process.cwd() + '/assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(app.get('PORT'), function() {
    console.log('Listening on port', app.get('PORT'));
});
