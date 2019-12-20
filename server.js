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
  create: { type: Date, defult: Date.now }
});

//Create modle
var Blog = mongoose.model("Blog", blogSchema);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("server running on port 3000!!");
});
