const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


const corsOptions = {
    origin: ['http://localhost:5173',],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ifklbg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const blogsCollection = client.db('QuilogDB').collection('blogs')
        const usersCollection = client.db('QuilogDB').collection("users")

        app.post('/user', async (req, res) => {
            const user = req.body;
            const userInfo = {
                ...user
            }
            const result = await usersCollection.insertOne(userInfo)
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        app.get('/blogs', async (req, res) => {
            const result = await blogsCollection.find().toArray()
            res.send(result)
        })

        // post blogs
        app.post('/create-blog', async (req, res) => {
            const blogsInfo = req.body;
            return console.log(blogsInfo);
            
            const result = await blogsCollection.insertOne(blogsInfo);
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

app.get('/', (req, res) => {
    res.send('Hello from Quilog Server')
})

app.listen(port, () => {
    console.log(`Quilog Server is running on port ${port}`)
})