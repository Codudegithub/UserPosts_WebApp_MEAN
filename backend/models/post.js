const mongoose= require('mongoose');

const postSchema = mongoose.Schema({    // create a schema
    title:{type:String,required:true},
    content:{type:String,required:true}
}); 

module.exports = mongoose.model('Post',postSchema); // create a model
