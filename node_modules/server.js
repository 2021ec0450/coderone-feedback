const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const feedback=require('./models/Feedback');
const app=express();
const port=3000;
mongoose.connect('mongodb://localhost:27017/CODERONE FEEDBACK')
.then(()=>console.log('Mongodb Connected'))
.catch(err=>console.error('Mongodb connection error',err));

app.arguments(bodyParser.urlencoded({extended:true}));
app.arguments(express.static('views'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html');

});
app.post('/submit-feedback',async(req,res)=>{
    const feedback=new feedback({
        name:req.body.name,contactNumber:req.body.contactNumber,
        email:req.body.email,feedback:req.body.feedback
    });
    try{
        await feedback.save();
        console.log('Feedback saved successfully');
        res.send(
            <html>
                <head>
                    <title>Feedback Submitted</title>
                </head>
                <body>
                    <h1>Thank yoy</h1>
                    <p>your feedback has been successfully submitted.</p>
                    <a href="/">GO back to form</a>
                </body>
            </html>
        );
    }catch(err){
        console.error('error saving feedback:',err);
        res.status(500).send('there was an error submitting your feedback');
    }
})
app.listen(port,()=>{
    console.log('Server is running on http://localhost:${port}');
})