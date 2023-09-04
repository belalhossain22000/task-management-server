const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
// Enable middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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
    // started api from here
  
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

// Define route handlers here
// Task get API
app.get("/getTasks", async (req, res) => {
  const TaskCollection = client.db("TaskCollection").collection("tasks");
  const result = await TaskCollection.find().toArray();
  res.send(result);
});

// Task get API by ID
app.get("/getTask/:id", async (req, res) => {
  const itemId = req.params.id; 

  const TaskCollection = client.db("TaskCollection").collection("tasks");

  try {
    const result = await TaskCollection.findOne({ _id: new ObjectId(itemId) });
    console.log(result)
    if (!result) {
      // If no task with the provided ID is found, return a 404 response
      return res.status(404).send("Task not found");
    }

    res.send(result);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).send("Error fetching task");
  }
});

// Post request for tasks
app.post("/postTasks", async (req, res) => {
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
// Update task by ID
app.put("/updateTask/:id", async (req, res) => {
  const itemId = req.params.id; 
  const updatedTask = req.body; 
  const TaskCollection = client.db("TaskCollection").collection("tasks");
  // console.log(itemId,updatedTask)

  try {
    // Attempt to update the task with the specified ID
    const result = await TaskCollection.findOneAndUpdate(
      { _id: new ObjectId(itemId) },
      { $set: updatedTask },
      { returnOriginal: false }
    );
console.log( result.ok)
    if (!result) {
     
      return res.status(404).send("Task not found");
    }

    res.send(result);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Error updating task");
  }
});
// Delete task by ID
app.delete("/deleteTask/:id", async (req, res) => {
  const itemId = req.params.id;

  const TaskCollection = client.db("TaskCollection").collection("tasks");

  try {
   
    const result = await TaskCollection.deleteOne({ _id: new ObjectId(itemId) });
    console.log(result)
    if (result.deletedCount === 0) {
    
      return res.status(404).send("Task not found");
    }
  
    res.send(result);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Error deleting task");
  }
});



// Run the application
run().catch(console.dir);
