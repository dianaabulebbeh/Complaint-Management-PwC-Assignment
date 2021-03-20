var Complaint=require('../models/Complaint');
var Users=require('../models/User');


exports.addComplaint=function(req,res,next){ 
   Users.findById(req.body.id ).exec(function (err, result) {
if(!result){
    res.send("please login")
}else{
    const complaint = new Complaint();
    complaint.user = req.body.id;
    complaint.message = req.body.complaintMessage;
    complaint.status = "pending"
    complaint.save(function (err, doc) {
        if (err || !doc) {
            res.send(err)
            console.log(err)
        }else{
         res.send(doc)
        }  
    }); 
}
   })
}


exports.updateComplaintStatus=function(req,res,next){ 
    let complaints=req.body
    complaints.forEach(complaint => {
        Complaint.findById(complaint.id ).exec(function (err, result) {
            if(err){
                res.send(err)
            }else{
                result.status = complaint.status
                result.save(function (err, doc) {
                    if (err || !doc) {
                        res.send(err)
                        console.log(err)
                    }else{
                     res.send(doc)
                    }  
                }); 
            }
               })
    });

 }

