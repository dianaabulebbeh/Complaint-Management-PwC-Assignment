var mongoose=require('mongoose');
var schema=mongoose.Schema;
var ComplaintsSchema=new schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message:{ type: String, required: true },
    status: {   type: String,
        enum: ['pending', 'resolved', 'dismissed'],
     },
});
module.exports=mongoose.model('Complaint', ComplaintsSchema);
