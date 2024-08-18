const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_URL;

let client; // So, this variable can be accessible from other functions below as well.

async function connectDB() {
  // here the mongo code should be put inside the function

  if (!client) {
    // a logic should check whether a client has been initiated or not

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
  return client;
}
const getDB = () => {
  if (!client) {
    throw new Error("MongoClient Not Initialized");
  }
  return client.db("NTech_DB"); // previously we did this directly on the one page file, now we do it more cautiously
};

module.exports = { connectDB, getDB };
