var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  mongoose = require("mongoose"),
  app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//config mongo
mongoose.connect("mongodb://localhost:27017/restfull_blog_db", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//create Schema
var blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

//Create modle
var Blog = mongoose.model("Blog", blogSchema);
// create a text blog
// Blog.create({
//   title: "test blog",
//   image:
//     "https://images.unsplash.com/photo-1554825203-68321ddde262?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   body: " this is a test blog with a simple image and text"
// });

//Restfull routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
//INDEX
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//CREATE
app.post("/blogs", (req, res) => {
  //create a blog post
  req.body.blog.body = req.sanitizer(req.body.blog.body);
  Blog.create(req.body.blog, (err, newPost) => {
    if (err) {
      res.render("new");
    } else {
      //redirect back to blogs
      res.redirect("blogs");
    }
  });
});
//NEW - show form to create new post
app.get("/blogs/new", (req, res) => {
  res.render("new");
});
//SHOW - show single post
app.get("/blogs/:id/show", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});
//EDIT
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("blogs/");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});
//UPDATE
app.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitizer(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id + "/show");
    }
  });
});
//DELETE
app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000!!");
});
