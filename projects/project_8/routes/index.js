// Setting dependencies.
var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.redirect("/books")
});

// If url path is incorrect, show 'page-not-found' page.
router.get(/^(?!.*\/books)/, function(req, res, next) {
  res.render('books/page-not-found');
});

// If the url path is '/books/books/new' redirect to '/books/new'.
router.get(/^((\/books\/books\/new).*)$/, function(req, res, next) {
  res.redirect("/books/new")
});

module.exports = router;
