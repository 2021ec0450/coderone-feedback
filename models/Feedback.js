const mongoose=require('mongoose');
const feedbacksystem=new mongoose.Schema({
    name: String,
    contactNumber: String,
    email:String,
    feedback:String

}
   


);
module.exports=mongoos.model('feedback',feedbackSchema);