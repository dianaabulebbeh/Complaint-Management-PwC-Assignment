
var express = require("express");
var bodyParser=require('body-parser');
var app=express();
var port =process.env.port || 4000;
const mongoose = require('mongoose')
const uri = 'mongodb://localhost/abcCompany2'
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







// const test = new AddUser({ username: 'Diana', password: "diana123" ,admin:true})
// const testComplaint = new AddComplaint({ message: 'new Complaint', status: "pending" })

// const Schema = mongoose.Schema
// const users = new Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     admin: Boolean,
// })

// const complaint = new Schema({
//     message: { type: String,  required: true,},
//     status: { type: String },
   
// })
// const User = db.model('users', users)
// const Complaint = db.model('complaint', complaint)


// db.once('connected', function (err) {
//   if (err) { return console.error(err) }
//   AddUser.create(test, function (err, doc) {
//     if (err) { return console.error(err) }
//     console.log(doc)
//     return db.close()
//   }) 

//   AddComplaint.create(testComplaint, function (err, doc) {
//     if (err) { return console.error(err) }
//     console.log(doc)
//     return db.close()
//   }) 
// })