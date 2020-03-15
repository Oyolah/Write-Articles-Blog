const express = require("express");
const mongoose = require("mongoose");
const myMethod = require("method-override");
const Article = require("./models/articles");
const articlesRouter = require("./routes/articles");

const app = express();

// connecting db
mongoose.connect(
  "mongodb://localhost/blog",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

// setup view engine
app.set("view engine", "ejs");

//loading the routers
app.use(express.urlencoded({ extended: false }));
app.use(myMethod("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articlesRouter);
// express listening to a port
app.listen(4000, () => {
  console.log("You are listening to a port");
});
