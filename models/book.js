module.exports = (mongoose) => {
    const book = mongoose.model(
      'books',
      mongoose.Schema(
        {
          title: String,
          book: String,
          genre: String,
          publicationYear: String,
          isbn: String,
          copiesAvailable: String,
          description: String,
          
          
        },
        { timestamps: true }
      )
    );
  
    return book;
  };

  const mongoose = require('mongoose');

  //Using Mongoose for Model Definition - GraphQL

  const bookSchema = new mongoose.Schema({
      title: String,
      author: String,
      genre: String,
      publicationYear: String,
      isbn: String,
      copiesAvailable: String,
      description: String
  });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

  