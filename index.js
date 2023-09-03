const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// Enable middleware
app.use(cors());
app.use(express.json());

const dbuser = "test-crud";
const dbpass = "dKxyHDKaiYni9rd2";

const uri = `mongodb+srv://${dbuser}:${dbpass}@cluster0.dp3om9f.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Define your route handlers here

// Home route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Connect to MongoDB and start the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const TaskCollection = client.db("TaskCollection").collection("tasks");
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");

    // Start listening on the defined port
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } finally {
    // Note: You should close the MongoDB client when done
    // await client.close();
  }
}

// Define your route handlers here
// Task get API
app.get("/getTasks", async (req, res) => {
  const TaskCollection = client.db("TaskCollection").collection("tasks");
  const result = await TaskCollection.find().toArray();
  res.send(result);
});

// Post request for tasks
app.post("/tasks", async (req, res) => {
  const TaskCollection = client.db("TaskCollection").collection("tasks");
  const data = req.body;
  try {
    // Insert the data into MongoDB
    const result = await TaskCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Run the application
run().catch(console.dir);
