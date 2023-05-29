const express = require('express');
const app =express();

app.use(express.static('Miniproj'));

const hbs = require('hbs');
const async = require('hbs/lib/async');
const path = require('path');
require("./db/con");


const Register = require("./models/registers");

const index_html_path = path.join(__dirname, '..', '..', 'MiniProj');



const port = process.env.PORT || 8000;
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index");

});


app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee= new Register({
                email : req.body.email,
                password : password,
                confirmpassword:cpassword

            })
            const registered = await registerEmployee.save();
            res.status(201).render("index"); 
            

        }else{
            res.send("password are not matching ")
        }


    } catch {
        res.status(400).send(error)
    }

})
app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",async(req,res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email}); 

        if(useremail.password === password){
            //res.status(201).render("index")  
            
            res.status(201).sendFile(path.join(index_html_path, 'index.html'));

        }else{
            res.send("password are not matching ")
        }

        


        
    } catch (error) {
        res.status(400).send("invalid Email")
        
    }
})

app.listen(port,()=>{
    console.log("server is running at port 8000");
})