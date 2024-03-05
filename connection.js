// const dotenv = require("dotenv")
// dotenv.config()

require('dotenv').config();

const { MongoClient } = require("mongodb");

// uri connection string.
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yoczwia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('test');
    const persons = database.collection('contacts');

    // Query for a name that has the title 'firstName'
    const query = { firstName: 'Boco' };
    const person = await persons.findOne(query);

    console.log(person);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);