const {MongoClient} = require('mongodb');
// ---------------------TEST FOR USER-------------------------- 
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
    const users = db.collection('user');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
// --------------------TEST FOR REVIEW---------------------------------- 
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
      const review = db.collection('review');
  
      const mockReview = {_id: 'some-review-id', text: 'some review here'};
      await review.insertOne(mockReview);
  
      const insertedReview = await review.findOne({_id: 'some-review-id'});
      expect(insertedReview).toEqual(mockReview);
    });
  });
// --------------------TEST FOR SONG---------------------------------- 
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
      const song = db.collection('song');
  
      const mockSong = {_id: 'some-song-id', title: 'some song here'};
      await song.insertOne(mockSong);
  
      const insertedSong = await song.findOne({_id: 'some-song-id'});
      expect(insertedSong).toEqual(mockSong);
    });
  });
// --------------------TEST FOR STORE---------------------------------- 
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
      const store = db.collection('store');
  
      const mockStore = {_id: 'some-store-id', name: 'some store name here'};
      await store.insertOne(mockStore);
  
      const insertedStore = await store.findOne({_id: 'some-store-id'});
      expect(insertedStore).toEqual(mockStore);
    });
  });