//jshint esversion:6

const express =  require("express");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
  res.render("main");
});









app.listen(3000, ()=>{
  console.log("Server initialized on port 3000.");
});
