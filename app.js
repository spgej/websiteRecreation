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
const art5 = new Article({
  title: "Here's Why Pokemon Cards Still Sell",
  body: "lorem ipsum",
  imgtag: "poke",
});
const art6 = new Article({
  title: "When will the MCU End?",
  body: "lorem ipsum",
  imgtag: "marv",
});
const art7 = new Article({
  title: "Why You Should Care Which Companies Want You Back in Office",
  body: "lorem ipsum",
  imgtag: "twit",
});
const art8 = new Article({
  title: "This Console Has Officially Won the Console War",
  body: "lorem ipsum",
  imgtag: "cons",
});
const art9 = new Article({
  title: "DC Comics Reboot the Universe, Again?",
  body: "lorem ipsum",
  imgtag: "dcr",
});
const art10 = new Article({
  title: "Victor Officially Announced: Goku VS. Superman",
  body: "lorem ipsum",
  imgtag: "gvs",
});
const art11 = new Article({
  title: "Is Twitch Still a Video Game Streaming Webite?",
  body: "lorem ipsum",
  imgtag: "tsvg",
});

const artArray = [art1, art2, art3, art4, art5, art6, art7, art8, art9, art10, art11];

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
      const slicedArray1 = articles.slice(0, 4);
      const slicedArray2 = articles.slice(4, 8);
      const slicedArray3 = articles.slice(8, );
      res.render("main", {
        slicedArray1: slicedArray1,
        slicedArray2: slicedArray2,
        slicedArray3: slicedArray3,
      });
    }
  });
});


app.get("/reviews", (req, res) => {
  Article.find({}, (err, articles) => {
    res.render("reviews", {
      articles: articles
    });
  });
});

app.get("/noroute", (req, res)=>{
  res.render("noroute");
});


app.get("/articles/:articleId", (req, res) => {
  const requestedArticleId = req.params.articleId;

  Article.findOne({
    _id: requestedArticleId
  }, (err, article) => {
    if (!err) {
      res.render("fullarticle", {
        article: article,
        title: article.title,
        content: article.content
      });
    }
  });
});

app.post("/articles/:articleId", (req, res) => {
  const requestedArticleId = req.params.articleId;

});




app.listen(process.env.PORT || 3000, () => {
  console.log("Server initialized on port 3000.");
});
