const ProductsList = require('../model/product.model');
const Cart = require('../model/cart.model');






exports.getProductList = async (req, res) => {
    try {
        ProductsList.find({
        },
        async (err, item) => {
          if (err) {
            return res.status(404).send({
              data:false,
              message: 'No Items found',
              status:404
            });
          }
  
          if (!item) {
            return res.status(404).send({
              data:false,
              message: 'No Items Found',
              status:404
            });
          }
  
          if (item ){
              return res.status(200).send({
                data:item,
                status:200,
                message:"success",
              });
            }
        }
      );
    } catch (error) {
      return res.status(500).send({
        data:req.body,
        message: 'Internal server error',
        status:500
      });
    }
  };

  exports.addProduct = async (req, res) => {
    try {
        let product=new ProductsList(req.body)
        product.save().then(() => {
            return res.status(200).send({
            data:true,
            message: 'Item Added succesfully',
            status:200
            });

          })
          .catch(() => {
            return res.status(400).send({
              data:false,
              message: 'Error occured in DB',
              status:400
            });
          });
    } catch (error) {
      return res.status(500).send({
        data:req.body,
        message: 'Internal server error',
        status:500
      });
    }
  };  

  exports.getProductsBasedOnFilter = async (req, res) => {
    if(req.body.category==""){
        ProductsList.find({
           price: {
             $lte: req.body.maxPrice || 100000,
             $gte: req.body.minPrice || 500
           }
         }).sort({
           serviceCost: 'asc'
         }).then((result) => {
           {
             res.status(200).send({
               status: 200,
               message: 'Fetched data sucessfully',
               data: result
             });
           }
         }).catch(() => {
           res.status(404).send({
             status: 404,
             message: 'Failed to fetch the data',
             data: false
           });
         });
    }
    else{
        ProductsList.find({
            category: req.body.category,
           price: {
             $lte: req.body.maxPrice || 100000,
             $gte: req.body.minPrice || 50
           }
         }).sort({
           serviceCost: 'asc'
         }).then((result) => {
           {
             res.status(200).send({
               status: 200,
               message: 'Fetched data sucessfully',
               data: result
             });
           }
         }).catch(() => {
           res.status(404).send({
             status: 404,
             message: 'Failed to fetch the data',
             data: false
           });
         });
    }
    
    
  };

  exports.getProductById = async (req, res) => {
    try {
      const result = await ProductsList
        .findOne({
          _id: req.query.id,
        })
        .populate('services');
      res.status(200).send({
        status: 200,
        data: result,
        message: 'data fetched sucessfully',
      });
    } catch (err) {
      res.status(400).send({
        status: 404,
        data: false,
        message: 'Failed to fetch the data',
      });
    }
  };

  exports.addProductsToCart = async (req, res) => {
    const userId = req.body.userId;
    Cart.findOne({userId: userId})
     .then((customercart) =>{
         if(customercart){
             const productDetails=req.body.productDetails;
             const addedservices=customercart.productDetails;
             addedservices.push(productDetails);
        Cart.updateOne(
           { userId : userId },
           {
               $set : {
                   productDetails: addedservices,
               }
           }
        )
        .then (() => {
            res.status(200).send({
              message :'Added to cart successfully!!',
              status : 200
            });
        })
        .catch((err) =>{
            res.status(400).send({
                message : err || 'error while adding to cart',
                status: 400

            });
        });
     }
     else{
       const cart = new Cart({
           userId: userId,
           productDetails: [req.body.productDetails]
     }
     );

     cart.save()
       .then(() => {
            res.status(200).send({
                 message: 'Added to cart successfully!!',
                 status: 200
                });
               }).catch(err => {
                  res.status(400).send({
                    message: err || 'error while adding to cart',
                    status: 400
                       });
                   });
           }
       })
       .catch(err => {
           res.status(400).send({
               message: err.message || 'error while adding to cart',
               status: 400
           });
       });
};


exports.getProductsFromcart = async(req, res) => {
   const userId = req.query.id;
   Cart.findOne({ userId : userId })
       .then(async (cartlist) => {
           if (!cartlist) {
               res.status(400).send({
                   message: ' Cart not found for customer',
                   status: 400,
               });
           }
           else {
               if(cartlist.productDetails.length==0){
                   res.status(200).send({
                       data:[],
                       message:"cart is empty",
                       status:200
                   })
               }
               res.status(200).send({
                data:cartlist.productDetails,
                message:"cart details fetched successfully!!",
                status:200
            })
            //    const servicesbooked = [];
            //    for(let i = 0; i < cartlist.productDetails.length; i++){
            //        // eslint-disable-next-line no-await-in-loop
            //        const service=await ProductsList.findOne({_id: cartlist.productDetails[i]});
            //        servicesbooked.push(service);
            //            if(i === cartlist.productDetails.length-1){
            //                res.status(200).send(
            //                    {
            //                     data:servicesbooked
            //                    }
            //                );
            //            }
            //    }
           }
       }).catch((err) => {
           if (err.kind === 'ObjectId') {
               return res.status(404).send({
                   message: 'cart not found ',
                   status: 404,
               });
           }
           return res.status(500).send({
               message: 'Error',
               status: 500,
           });
       });

};

exports.deleteProductFromCart = (req, res) =>  {
    const userId = req.query.userId;
    Cart.findOne({userId: userId})
    .then(cartlist => {
        if (!cartlist) {
            res.status(404).send({
                message: ' Cart not found',
                status: 404,
            });
        }
        else{
            const productToDelete = req.query.name;
            const updatedservices = [];
            let count=0;
            const productsInCart = cartlist.productDetails;
            for(let i = 0; i < productsInCart.length; i++){
                if(productsInCart[i].name==productToDelete && count==0){
                    count+=1
                }
                else if(productsInCart[i] !== productToDelete){
                    updatedservices.push(productsInCart[i]);
                }
            }
            Cart.updateOne(
                { userId: userId },
                {
                    $set: {
                        productDetails : updatedservices,
                    }
                }
            )
                .then(() => {
                    res.status(201).send({
                        message: 'you deleted service from cart',
                        status: 200
                    });
                  })
                .catch((err) => {
                    res.status(400).send({
                        message: err.message || 'error',
                        status: 400
                    });
                });
        }
    });
};