const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/formRegistration",{
    
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log(e);
})
