var Book = require('../models/book')

module.exports = function(express, db) {
  Router = express.Router();

  Router.route("/books")
    // use req.connection.remoteAddress for individualive each todo, without auth module.
    .get(function(req, res) {
      Book.find({studentOwner: req.connection.remoteAddress}, function (err, books) {
        if (err) return res.status(500).send(err);
        res.json(books)
      })
    })

    .post(function(req, res) {
      var newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        edition: req.body.edition,
        about: req.body.about,
        price: req.body.price,
        studentOwner: req.connection.remoteAddress
      });

      newBook.save(function(err, book) {
        if (err) return res.status(500).send(err);
        res.json(book);
      })
    })

  Router.route("/books/:id")
    .get(function(req, res) {
      Todo.findOne({studentOwner: req.connection.remoteAddress, _id: req.params.id}, function(err, book) {
        if (err) return res.status(500).send(err);
        res.json(book)
      })
    })
    .put(function(req, res) {
      var query = {studentOwner: req.connection.remoteAddress, _id: req.params.id};
      var update = {};
      if (req.body.title) update.title = req.body.title;
      if (req.body.description) update.description = req.body.description;
      if (req.body.state) update.state = req.body.state;
      Book.findOneAndUpdate(query, update, {new: true, runValidators: true}, function(err, updatedBook) {
        if (err) return res.status(500).send(err);
        res.json(updatedBook);
      })

    })
    // Delete an message
    .delete(function(req, res) {
      var query = {studentOwner: req.connection.remoteAddress, _id: req.params.id};
      Todo.findOneAndRemove(query, {}, function(err, todo) {
        if (err) return res.status(500).send(err);
        res.json(todo);
      })
    });

  return Router;
}
