'use strict';

var dateFormat = require('dateformat');

// Set data types for all table headers and validation for title and author headers.
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author is required"
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});

  // Set current date when a book listing is first created.
  Book.prototype.publishedAt = function() {
    return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
  };

  return Book;
};