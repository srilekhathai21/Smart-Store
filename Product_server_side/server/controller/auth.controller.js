const jwt = require('jsonwebtoken');
const CustomerDetails = require('../model/customer.model');
require('dotenv').config();
const createToken = (id) => {
  return jwt.sign({
      id,
    },
    process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.customerLogin = async (req, res) => {
  try {
    CustomerDetails.findOne({
        email: req.body.email
      },
      async (err, user) => {
        if (err) {
          return res.status(404).send({
            data:false,
            message: 'No user found',
            status:404
          });
        }

        if (!user) {
          return res.status(404).send({
            data:false,
            message: 'No User Found',
            status:404
          });
        }

        if (user ){
            const token = createToken(req.body.customerEmail);
            return res.status(200).send({
              data:token,
              status:user.username,
              message: user._id,
            });
          }
         else {
          return res.status(404).json({
              data:false,
              message: 'Wrong credentials',
              status:400
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

exports.customerSignup = async (req, res) => {

  
  try {
    CustomerDetails.findOne({
        email: req.body.email
      },
      async (err, user) => {
        if (err) {
           return res.status(404).send({
            data:false,
            message: 'Error occured',
            status:404
          });
        }

        if (user) {
          return res.status(404).send({
            data:false,
            message: 'User Already exists',
            status:404
          });
        }
        const newCustomer = new CustomerDetails(req.body);
        newCustomer
          .save()
          .then(() => {
            return res.status(200).send({
            data:true,
            message: 'User Added succesfully',
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
      }
    );
  } 
  catch (err) {
    return res.status(500).send({
              data:req.body,
              message: 'Internal Server Error',
              status:500
    });
  }

};



