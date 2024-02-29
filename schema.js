const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const { ObjectId } = require('mongodb');
const Author = require('./models/author'); // Import Author model
const Book = require('./models/book'); // Import Book model


// Define Author type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: { type: GraphQLInt },
        name: { type: GraphQLString },
        birthDate: { type: GraphQLString },
        nationality: { type: GraphQLString },
        biography: { type: GraphQLString },
        website: { type: GraphQLString },
        booksWritten: { type: GraphQLString },
        awards: { type: GraphQLString }
    })
});

// Define Book type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLInt },
        title: { type: GraphQLString },
        author: { type: AuthorType }, // Update to AuthorType
        genre: { type: GraphQLString },
        publicationYear: { type: GraphQLString },
        isbn: { type: GraphQLString },
        copiesAvailable: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Query to get all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args, context) {
                // Logic to retrieve all authors from MongoDB
                return context.db.collection('authors').find().toArray();
            }
        },
        // Query to get an author by ID
        authorById: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args, context) {
                return context.db.collection('authors').findOne({ _id: ObjectId(args.id) });
            }
        },
        // Query to get an author by name
        authorByName: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                return context.db.collection('authors').findOne({ name: args.name });
            }
        }
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
                return context.db.collection('author').insertOne(author).then(result => result.ops[0]);
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
                return context.db.collection('books').insertOne(book).then(result => result.ops[0]);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
