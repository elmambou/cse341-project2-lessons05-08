const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');

const { ObjectId } = require('mongodb');
const Author = require('./models/author'); // Import Author model
const Book = require('./models/book'); // Import Book model


// Defining Author type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        nationality: { type: GraphQLString },
        biography: { type: GraphQLString },
        website: { type: GraphQLString },
        booksWritten: { type: GraphQLString },
        awards: { type: GraphQLString }
    })
});

// Defining Book type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        author: { type: GraphQLString }, 
        genre: { type: GraphQLString },
        publicationYear: { type: GraphQLString },
        isbn: { type: GraphQLString },
        copiesAvailable: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

// Defining Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Query to get all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args, context) {
                // Logic to retrieve all authors from MongoDB
                return context.db.collection('author').find().toArray();
            }
        },
    
        // Query to get an author by ID
        author: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) } 
            },
            resolve(parent, args, context) {
                return context.db.collection('author').findOne({ _id: new ObjectId(args.id) }); 
            }
        },

        // Query to get an author by name
        authorByName: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                return context.db.collection('author').findOne({ name: args.name });
            }
        },


        // Query to get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args, context) {
                // Logic to retrieve all books from MongoDB
                return context.db.collection('book').find().toArray();
            }
        },
            
        // Query to get a book by ID
        book: {
            type:BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) } 
            },
            resolve(parent, args, context) {
                return context.db.collection('book').findOne({ _id: new ObjectId(args.id) }); 
            }
        },
        
        // Query to get a book by title
        bookByTitle: {
            type: BookType,
            args: {
               title: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                return context.db.collection('book').findOne({ title: args.title });
            }
        },

   }
});

// Define Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Mutation to add an author
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                birthDate: { type: new GraphQLNonNull(GraphQLString) },
                nationality: { type: new GraphQLNonNull(GraphQLString) },
                biography: { type: new GraphQLNonNull(GraphQLString) },
                website: { type: GraphQLString },
                booksWritten: { type: new GraphQLNonNull(GraphQLString) },
                awards: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                const author = new Author(args);
                return context.db.collection('author').insertOne(author)
                    .then(result => {
                        // Checking if the insertion was successful
                        if (result && result.ops && result.ops.length > 0) {
                            // Return the inserted author
                            return result.ops[0];
                        } else {
                            throw new Error('A new Author has been Added');
                        }
                    })
                    .catch(error => {
                        throw new Error('Failed to add author');
                    });
            }
        },
        // Mutation to add a book
        addBook: {
            type: BookType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                publicationYear: { type: new GraphQLNonNull(GraphQLString) },
                isbn: { type: new GraphQLNonNull(GraphQLString) },
                copiesAvailable: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context) {
                const book = new Book(args);
                return context.db.collection('book').insertOne(book)
                    .then(result => {
                        // Check if the insertion was successful
                        if (result && result.ops && result.ops.length > 0) {
                            // Return the inserted book
                            return result.ops[0];
                        } else {
                            throw new Error('A new Book has been Added');
                        }
                    })
                    .catch(error => {
                        throw new Error('Failed to add book');
                    });
            }
        },
        // Editing Author information from the collection
        updateAuthor: {
            type: AuthorType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                birthDate: { type: new GraphQLNonNull(GraphQLString) },
                nationality: { type: new GraphQLNonNull(GraphQLString) },
                biography: { type: new GraphQLNonNull(GraphQLString) },
                website: { type: GraphQLString },
                booksWritten: { type: new GraphQLNonNull(GraphQLString) },
                awards: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                // Logic to update an existing author in the database
                // Use ObjectId for the id field
                const { db } = context;
                const { _id, ...updateFields } = args;
                return db.collection('author').updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updateFields }
                ).then(() => {
                    // Return the updated author
                    return db.collection('author').findOne({ _id: new ObjectId(_id) });
                }).catch(err => {
                    throw new Error('Failed to update author');
                });
            }
        },    
        
        //Editing Book information from the collection
        updateBook: {
            type: BookType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                publicationYear: { type: new GraphQLNonNull(GraphQLString) },
                isbn: { type: new GraphQLNonNull(GraphQLString) },
                copiesAvailable: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context) {
                // Logic to update an existing book in the database
                // Use ObjectId for the id field
                const { db } = context;
                const { _id, ...updateFields } = args;
                return db.collection('book').updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: updateFields }
                ).then(() => {
                    // Return the updated book
                    return db.collection('book').findOne({ _id: new ObjectId(_id) });
                }).catch(err => {
                    throw new Error('Failed to update book');
                });
            }
        },    
        // Delete Author from the Author database collection
        deleteAuthor: {
            type: AuthorType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context) {
                // Logic to delete an author from the database
                return context.db.collection('author').findOneAndDelete({ _id: new ObjectId(args._id) })
                    .then(result => result.value)
                    .catch(err => {
                        throw new Error('Failed to delete author');
                    });
            }
        },

        // Delete book from the Book database collection
        deleteBook: {
            type: BookType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args, context) {
                // Logic to delete a book from the database
                return context.db.collection('book').findOneAndDelete({ _id: new ObjectId(args._id) })
                    .then(result => result.value)
                    .catch(err => {
                        throw new Error('Failed to delete book');
                    });
            }
        },

    }   
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
