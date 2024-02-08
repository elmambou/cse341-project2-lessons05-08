module.exports = (mongoose) => {
    const author = mongoose.model(
      'author',
      mongoose.Schema(
        {
          temple_id: Number,
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
  