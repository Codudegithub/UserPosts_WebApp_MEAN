const express=require('express');
const bodyParser=require('body-parser');
const Postmodel = require('./models/post');
const mongoose = require('mongoose');

const app = express() ;

mongoose.connect('mongodb+srv://aprvtndn:Dudemanlol%40101@cluster0.mxbdawh.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to database');
}   
).catch(()=>{   
    console.log('Connection failed');
}   
);

app.use(bodyParser.json()); // parse the body of incoming request   
app.use(bodyParser.urlencoded({extended:false})); // parse the body of incoming request

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');   
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.delete('/posts/:id',(req,res,next)=>{
    Postmodel.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({message:'Post deleted'});
    });
});

app.post('/posts',(req,res,next)=>{
    const post=new Postmodel({
        title:req.body.title,
        content:req.body.content
    }); 
    post.save().then(createdPost=>{
        console.log(createdPost);
        res.status(201).json({
            message:'Post added successfully',
            postId: createdPost._id
        });
    }
    );
});

app.use('/posts', (req,res,next) => {
    Postmodel.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documents
        });
    });                                
});




module.exports = app;