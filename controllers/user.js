var Users=require('../models/User');
var Complaint=require('../models/Complaint');
const url = require('url');    

exports.signupPage=function(req,res){
    res.render('signup.ejs')
}


exports.register=function(req,res,next){   
    Users.find({username:req.body.email} ).exec(function (err, result) {
    if (err) {
        res.send(err)
        console.log(err)
    } if (result.length > 0) {
        res.render('signup.ejs',{error:{message:"User Already Registered"}})
        
        next(); 
    }else if(req.body.psw !==req.body.confirmPassword ){
        res.render('signup.ejs',{error:{message:"Please make sure your password match"}})
        next(); 
    }
    else{
        const users = new Users();
        users.username = req.body.email;
        users.password = req.body.psw;
        users.admin = req.body.admin == "on" ? true: false;
        users.save(function (err, doc) {
            if (err || !doc) {
                res.send(err)
                console.log(err)
            }else{
                req.body.admin ?
                res.redirect(url.format({
                    pathname:"/adminPage",
                    query: {
                       "id": doc.id,
                       "name": doc.username,
                     }
                  }))
                : 
                        res.redirect(url.format({
                            pathname:"/customerPage",
                            query: {
                               "id": doc.id,
                               "name": doc.username,
                             }
                          }));
                        
            }
            
        }); 
    }

});
}



exports.signin=function(req,res,next){   
    Users.find({username:req.body.email} ).exec(function (err, result) {
    if (err) {
        res.send(err)
        console.log(err)
    } if (result.length === 0) {
        res.render('signin.ejs',{error:{message:"Please make sure your registered"}})
        
        next(); 
    }else if(req.body.psw !==result[0].password ){
        res.render('signin.ejs',{error:{message:"Please make sure your password is correct"}})
        next(); 
    }
    else{
            result[0].admin ?
            res.redirect(url.format({
                pathname:"/adminPage",
                query: {
                   "id": result[0].id,
                   "name": result[0].username,
                 }
              }))
               : 
                        res.redirect(url.format({
                            pathname:"/customerPage",
                            query: {
                               "id": result[0].id,
                               "name": result[0].username,
                             }
                          }));
       
    }

});
}


exports.customerPage=function(req,res){
    let userID=req.query.id
    let username=(req.query.name)
       Complaint.find({user:userID} ).exec(function (err, complaint) {
                    if (err) {
                        res.send(err)
                        console.log(err)
                    }else{
                        res.render('customerPage.ejs',{result:complaint,user:{username:username,_id:userID}})

                    }
                })

}

exports.adminPage=function(req,res){
    let userID=req.query.id
    let username=(req.query.name)
   Complaint.find().exec(function (err, complaint) {
        if (err) {
            res.send(err)
            console.log(err)
        }else{
            res.render('adminPage.ejs',{result:complaint,user:{username:username,_id:userID}})

        }
})

}


