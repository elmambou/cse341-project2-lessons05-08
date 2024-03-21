const {MongoClient} = require('mongodb');

// ---------------------TEST FOR BOOK-------------------------- 
describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const Book = db.collection('book');

    const mockBook = {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        publicationYear: "1949",
        isbn: "9780451524935",
        copiesAvailable: "3",
        description: "A dystopian novel depicting a totalitarian regime."

    };

    await Book.insertOne(mockBook);  
   });
});