// create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.json());

// data
const comments = [
  {
    id: 1,
    comment: "Hello World"
  }
];

// get all comments
app.get("/comments", (req, res) => {
  res.json(comments);
});

// get comment by id
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === parseInt(id));
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found");
    return;
  }
  res.json(comment);
});

// create comment
app.post("/comments", (req, res) => {
  const comment = {
    id: comments.length + 1,
    comment: req.body.comment
  };
  comments.push(comment);
  res.json(comment);
});

// update comment
app.put("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === parseInt(id));
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found");
    return;
  }
  comment.comment = req.body.comment;
  res.json(comment);
});

// delete comment
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === parseInt(id));
  if (!comment) {
    res.status(404).send("The comment with the given ID was not found");
    return;
  }
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

// listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});