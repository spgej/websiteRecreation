//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/articleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  title: String,
  body: String,
  imgtag: String,
});

const Article = mongoose.model("Article", schema);

const art1 = new Article({
  title: "Why Mega Man X is Definitely the Best Mega Man Game",
  body: "lorem ipsum",
  imgtag: "mma",
});
const art2 = new Article({
  title: "50 Reasons Why You Shouldn't Listen to Buzzfeed Ever in Regards to Anything",
  body: "lorem ipsum",
  imgtag: "loz",
});
const art3 = new Article({
  title: "Mass Effect Legendary Edition Review: The Same But Slightly Better",
  body: "lorem ipsum",
  imgtag: "me",
});
const art4 = new Article({
  title: "LOTR: The Fellowship of the Ring, Cast Revisited, Again",
  body: "lorem ipsum",
  imgtag: "lotr",
});

const artArray = [art1, art2, art3, art4];

app.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (articles.length === 0) {
      Article.insertMany(artArray, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      });
      res.redirect("/");
    } else {
      const slicedArray = articles.slice(Math.max(articles.length - 4, 0));
      res.render("main", {
        slicedArray: slicedArray,
      });
    }
  });
});



app.listen(3000, () => {
  console.log("Server initialized on port 3000.");
});
