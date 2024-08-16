const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

//Establish conncection
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology:true
})

const db = mongoose.connection;

//Define event listeners for DB connection

db.on('connected', () => {
  console.log('connected to MongoDb server');
});

db.on('error',(err) => {
  console.error('MongoDb connection error server:', err);
});

db.on('disconnected', () => {
  console.log('MongoDb connection disconnected');
});

//Export the DB connection
module.exports = db;




// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'mydb';

// async function main() {
//    // Use connect method to connect to the server
//    await client.connect();
//    console.log('Connected successfully to server');
//    const db = client.db(dbName);
//    const collection = db.collection('documents');
//    return 'done.';
// }

// main()
// .then(console.log)
// .catch(console.error)
// .finally(() => client.close());