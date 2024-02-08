module.exports = (mongoose) => {
    const book = mongoose.model(
      'books',
      mongoose.Schema(
        {
          title: String,
          book: String,
          genre: String,
          publicationYear: Number,
          isbn: String,
          copiesAvailable: Number,
          description: String,
          
          
        },
        { timestamps: true }
      )
    );
  
    return book;
  };
  