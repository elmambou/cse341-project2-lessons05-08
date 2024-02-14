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
  