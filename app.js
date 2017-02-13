var express = require('express'),
	load = require('express-load'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	//expressSession = require('express-session'),
	methodOverride = require('method-override'),
	//mongoose = require('mongoose'),
	app = express();
//app.use(express.bodyParser());
//global.db = mongoose.connect('mongodb://localhost/vigieseudeputado');

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(cookieParser('vigieseudeputado'));
//app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public'));

load('models')
.then('controllers')
.then('routes')
.into(app);

app.listen(1337, function(){
	console.log("Servidor OK");
})