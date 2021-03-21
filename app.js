
var express = require("express");
var bodyParser=require('body-parser');
var app=express();
var port =process.env.port || 4000;
const mongoose = require('mongoose')
const uri = 'mongodb://localhost/abcCompany'
 mongoose.createConnection(uri)
mongoose.connect(uri);
var db =mongoose.connection;
db.on('error',console.error.bind(console,'connection err'));
db.once('open',function(){
    console.log('DB connection alive')
});
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 app.use(require('./router/router'));

app.use(function(req,res,next){
    console.log("somthing is happening")
    next();
})
app.listen(port);
console.log("server start")

