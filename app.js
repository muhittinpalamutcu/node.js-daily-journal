const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const _ = require('lodash');


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const posts = [];


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



app.get("/", function(req, res) {
  res.render("home", {
    todayDate: date.getDate(),
    homeContent: homeStartingContent,
    postList: posts
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {
    todayDate: date.getDate()
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    todayDate: date.getDate(),
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    todayDate: date.getDate(),
    contactContent: contactContent
  });
});

app.post("/compose", function(req, res) {
  let title = req.body.postTitle;
  let postBody = req.body.postContent;
  const post = {
    title: title,
    post: postBody
  };
  posts.push(post);
  console.log(post);
  res.redirect("/");
});

app.get("/posts/:inside", function(req, res) {
  var linkTo=_.lowerCase(req.params.inside);
  posts.forEach(function(element) {
    var elementName=element.title.toLowerCase();
    if (elementName === linkTo) {
      console.log("Match Found!");
      res.render("post",{
        todayDate:date.getDate(),
        postTitle:element.title,
        postContent:element.post
      });
    }
    else{
      console.log("Not a match!");
    }
  });
});


app.listen(3000, function(req, res) {
  console.log("Server started on port 3000");
});
