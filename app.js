
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Welcome to our website! Here, you'll find a wealth of information on everything related to our business, from products and services to company history and values. We believe in providing exceptional value to our customers and building long-lasting relationships based on trust and integrity. Our team of dedicated professionals is committed to delivering high-quality solutions that meet your needs and exceed your expectations. So whether you're a first-time visitor or a long-time customer, we invite you to explore our site and see what we have to offer. Thank you for choosing us as your trusted partner!";
const aboutContent = "Our company takes pride in providing high-quality products and exceptional services to our clients. We use state-of-the-art equipment and innovative techniques to ensure that every project is completed with precision and efficiency. Our team of experts is highly skilled and experienced, and we are dedicated to delivering exceptional value to our customers. We are committed to providing a personalized approach to every project, and we work closely with our clients to understand their unique requirements and expectations. Whether you need custom fabrication or repair services, we are here to help you achieve your goals. Contact us today to learn more about our services and how we can help you with your next project.";
const contactContent = "In conclusion, our website is dedicated to providing high-quality content that is informative, engaging, and easy to navigate. We strive to keep our audience up-to-date with the latest trends, news, and information related to our niche. We also welcome feedback, comments, and suggestions from our visitors to help us improve our content and services. Thank you for visiting our website, and we hope you find what you’re looking for.git";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});



app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
