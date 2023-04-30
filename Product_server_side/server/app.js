
const express = require('express');
const customerRoutes = require('./routes/customer.routes');
const cors = require('cors');

const app = express();
const PORT = 3000;
const bodyParser=require('body-parser') 

const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://smartstore:SmartStore@cluster0.bmtwjeu.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.connection.on('connected', () => {
  console.log('connected');
  console.log(mongoose.connection.readyState); //logs 1
});
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  express.json({
    extended: false
  })
);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/customer', customerRoutes);
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
app.get('/', (req, res) => {
    res.send('Hello world!!');
  });

  module.exports = { mongoose };
  