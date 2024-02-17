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
  