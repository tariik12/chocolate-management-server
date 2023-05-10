const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const dotenv = require("dotenv")

app.use(cors())
dotenv.config()
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_CHOCOLATE}:${process.env.DB_PASS}@cluster0.nlw4swl.mongodb.net/?retryWrites=true&w=majority`;




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const ChocolateCollection = client.db("chocolateDB").collection("chocolate");
    
app.get('/addChocolate',async(req,res) =>{
  const chocolate = ChocolateCollection.find()
  const result =  await chocolate.toArray()
  res.send(result)
})

app.put('/addChocolate/:id',async(req,res) =>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}
  const options = { upsert: true };
  const updateChocolate = req.body;
  const chocolate = {
    $set: {
      name:updateChocolate.name,
      country:updateChocolate.country,
      category:updateChocolate.category,
      photo:updateChocolate.photo,
    },
  };
  const result = await movies.updateOne(filter, chocolate, options);
  res.send(result)
})

app.get('/addChocolate/:id',async(req,res) =>{
  const id = req.params.id;
  console.log(id)
  const query = { _id: new ObjectId(id) };
  const result = await ChocolateCollection.findOne(query);
  res.send(result)
})

app.post('/addChocolate', async(req,res)=>{
  const chocolate = req.body;
  console.log(chocolate)
  const result = await ChocolateCollection.insertOne(chocolate);
  res.send(result)



})

app.delete('/addChocolate/:id',async(req,res) =>{
  const id = req.params.id;
  console.log(id)

  const query = { _id: new ObjectId(id) };
    const result = await ChocolateCollection.deleteOne(query);
    res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Chocolate management server')
})

app.listen(port,() =>{
    console.log('Chocolate management server running',port)
})