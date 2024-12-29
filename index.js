const express =require("express");
const jwt=require("jsonwebtoken");
const path =require('path')
const app=express();
const jwt_secret="saiteja";
app.use(express.json());

users=[];
function authentication(req,res,next){
    const token =req.headers.token;
    try{
        const decodedData=jwt.verify(token,jwt_secret);
        req.username=decodedData;
        console.log(decodedData)
        next();
    }
    catch(e){
        console.log
        res.send("something went wrong")
    }
}

app.post('/signup',function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    
    if(users.find(user=>user.username===username)){
        res.send("username already found");
    }
    else{
        users.push({
            username,
            password
        })
        res.status(200).json(users)
    }
})

app.post('/signin',function(req,res){
    const username =req.body.username;
    const password=req.body.password;
    let currentUser;
    if(users.find(user=>(user.username===username && user.password===password))){
        const token=jwt.sign(username,jwt_secret);
        res.json({
            token
        })
    }else{
        res.status(404).send("Invalid username or password");
    }

})
app.get('/data',function(req,res){
    const token=req.headers.token;
    try{
        const data = jwt.verify(token,jwt_secret);
        console.log(data)
        const userDetails=users.find(user=> user.username===data)
        console.log(userDetails)
        res.json(userDetails)
    }catch(e){
        console.log("something went wrong")
    }
})

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"src","index.html"))
})


app.listen(3000);