var express          = require("express");
var app              = express();
var mongoose         = require("mongoose");
var bodyParser       = require("body-parser");
var methodOverride   = require("method-override");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.set("view engine","ejs");


var bodySchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", bodySchema);

// Blog.create({
//     title: "test BLOG",
//     image: "data:image/jpeg;base64,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",
//     body: "HELLO"
// });

app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index",{blogs: blogs});
        }
    });
});

//new route
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//create route
app.post("/blogs",function(req,res){
    //create blog 
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render("new");
        } else{
            // redirect
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show",{blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit",{blog: foundBlog});
        }
    });
});

app.put("/blogs/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, epdatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id );
        }
    });
});

//udate
app.delete("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(3000,function(){
    console.log("connected");
});


  
