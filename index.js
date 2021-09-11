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
  app.post('/addNews', (req, res) => {
    const newNews = req.body;
    console.log('adding new service: ', newNews);
    newsCollection.insertOne(newNews)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send({ result})
      })
  })



  app.patch('/update/:id',(req,res)=>{
    // console.log(req.body.title);
    newsCollection.updateOne({ _id: ObjectId(req.params.id) },
    {
        $set: {title:req.body.title,catagroy:req.body.catagroy,author:req.body.author,decription:req.body.decription,image:req.body.image}
    })
    .then(result=>{
       // console.log(result);
       res.send(result.modifiedCount > 0);
    })

})

app.delete('/delete/:id', (req, res) => {
    const ObjectId = require('mongodb').ObjectId;
    newsCollection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
           // console.log(result);
           res.send(result.deletedCount>0);
           if(result){
               event.target.parentNode.style.display.none;
           }
        })
})








  console.log('database connected successfully');




});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })