var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

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
  Blog.create(req.body.blog, (err, newPost) => {
    if (err) {
      res.render("new");
    } else {
      //redirect back to blogs
      res.redirect("blogs");
    }
  });
});
//NEW
app.get("/blogs/new", (req, res) => {
  res.render("new");
});
//SHOW
app.get("/blogs/:id/show", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.render("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});
//EDIT
app.get("/blogs/:id/edit", (req, res) => {});
//UPDATE
app.put("/blogs/:id", (req, res) => {});
//DELETE
app.delete("/blogs/:id", (req, res) => {});

app.listen(3000, () => {
  console.log("server running on port 3000!!");
});
