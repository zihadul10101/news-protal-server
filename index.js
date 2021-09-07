const express = require('express')
const ObjectId = require("mongodb").ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri="mongodb+srv://news-protal:test123@cluster0.vki6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = 5000



app.get('/', (req, res) => {
  res.send('Hello World!')
})




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err);
  const newsCollection = client.db("news-protal").collection("news");




  app.get('/news', (req, res) => {
    newsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })












  console.log('database connected successfully');




});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })