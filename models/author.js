  module.exports = (mongoose) => {
    const author = mongoose.model(
      'authors',
      mongoose.Schema(
        {
          name: String,
          birthDate: String,
          nationality: String,
          biography: String,
          website: String,
          booksWritten: String,
          awards: String,
          
        },
        { timestamps: true }
      )
    );
  
    return author;
  };
  
  const mongoose = require('mongoose');


//Using Mongoose for Model Definition - GraphQL
  const authorSchema = new mongoose.Schema({
    name: String,
    birthDate: String,
    nationality: String,
    biography: String,
    website: String,
    booksWritten: String,
    awards: String
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
