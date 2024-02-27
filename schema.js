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

// Define Author type
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

// Define Book type
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

// Define Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // Query to get all authors
        authors: {
            type: AuthorType,
          
            resolve(parent, args, context) {
                // Logic to retrieve all authors from MongoDB

                return context.db.collection('author').find().toArray();
            }
        },
      // Query to get an author by ID
        author: {
            type: new GraphQLList(AuthorType),
        args: {
            id: { type: GraphQLString }
        },
        resolve(parent, args, context) {
                   // Logic to retrieve a single author by id
          //      
          return context.db.collection('author').findOne({ _id: ObjectId(args.id) });
               
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
            resolve(parent, args) {
                const author = new Author({
                    name: args.name,
                    birthDate: args.birthDate,
                    nationality: args.nationality,
                    biography: args.biography,
                    website: args.website,
                    booksWritten: args.booksWritten,
                    awards: args.awards
                });
                return author.save();
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
            resolve(parent, args) {
                const book = new Book({
                    title: args.title,
                    author: args.author,
                    genre: args.genre,
                    publicationYear: args.publicationYear,
                    isbn: args.isbn,
                    copiesAvailable: args.copiesAvailable,
                    description: args.description
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
