module.exports = (mongoose) => {
    const book = mongoose.model(
      'book',
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
  