const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    features:String,
    reviews:Number,
    category:String,
    itemCartCount:Number,
    imgUrl:String
});


const ProductsList = new mongoose.model('Products', Product);
module.exports = ProductsList;
