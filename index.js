// Import required modules and packages
const express = require("express"); // Import the Express framework for building the server
const cors = require("cors"); // Import CORS for handling cross-origin requests
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb"); // Import MongoDB for database operations

// Create an Express app and set the port
const app = express(); // Create an Express app
const port = process.env.PORT || 3000; // Define the port the server will run on, with a fallback to 3000 if not specified

// Enable CORS and parse JSON in incoming requests
app.use(cors()); // Enable CORS for handling cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// MongoDB connection URI
const uri =
  "mongodb+srv://swapond960:At9bGcdUOX1LUNdj@cluster0.zzgr989.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Define the MongoDB server API version
    strict: true,
    deprecationErrors: true,
  },
});

// Async function for connecting to the MongoDB server
async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the "usersDB" database and "users" collection
    const database = client.db("usersDB");
    const usersCollection = database.collection("users");

    // Define routes for CRUD operations
    app.get("/users", async (req, res) => {
      // Retrieve all users from the collection
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      // Retrieve a user by their unique ID
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      // Create a new user and insert it into the collection
      const user = req.body;
      console.log("new user:", user);

      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      // Update a user's information by their ID
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };

      const result = await usersCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
      console.log(id, updatedUser);
    });

    app.delete("/users/:id", async (req, res) => {
      // Delete a user by their ID
      const id = req.params.id;
      console.log("please delete, ", id);
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the async function to run the server
run().catch(console.dir);

// Define a simple root route
app.get("/", (req, res) => {
  res.send("SIMPLE CRUD SERVER");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`simple crud is running on port: ${port}`);
});
