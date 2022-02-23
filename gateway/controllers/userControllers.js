const axios = require("axios").default;
const jwt = require("jsonwebtoken");
var cfg = require("../cfg");

const login = (req, res) => {
    var data = JSON.stringify(req.body);
  
    var config = {
      method: "post",
      url: "http://localhost:5000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
  
    axios(config)
      .then(function (response) {
        
          
          try {
            const user = response.data.payload
            // using the request body to generate token which will expire after 360s 
            jwt.sign({user}, cfg.TOKEN_SECRET, { expiresIn: '3600s' }, (err, token) => {
              //shipping web token to client as response
              res.json({
                status: response.data.status,
                message:response.data.message,
                token:response.data.status =="failed"?"":token ,
                payload:response.data.payload
              });
            });
          } catch (error) {
            res.status(500).send({
              status:"failed",
              message:'token generation failed',
          })
    }
      
      })
      .catch(function (error) {
        res.status(500).send({
            status:"failed",
            message:'something went wrong'
        })
      });
  }
const register = (req, res) => {
  var data = JSON.stringify(req.body);
  var config = {
    method: "post",
    url: "http://localhost:5000/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  
    axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }
const getUsers = (req, res) => {
    var data = JSON.stringify(req.body);
  
    var config = {
      method: "get",
      url: "http://localhost:5000/users",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }  
const getUser = (req, res) => {
    var email= req.params['email']
   
     var config = {
       method: "get",
       url: `http://localhost:5000/user/${email}`,
       headers: {
         "Content-Type": "application/json",
       },
     };
   
     axios(config)
       .then(function (response) {
         res.send(response.data);
       })
       .catch(function (error) {
        res.send(error.message);
       });
   }
   const deleteUser = (req, res) => {
    var id= req.params['id']
   
     var config = {
       method: "delete",
       url: `http://localhost:5000/delete/${id}`,
       headers: {
         "Content-Type": "application/json",
       },
     };
   
     axios(config)
       .then(function (response) {
         res.send(response.data);
       })
       .catch(function (error) {
        res.send(error.message);
       });
   }
const getAnalytics = (req, res) => {

    var config = {
      method: "get",
      url: "http://localhost:5000/analytics",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }    
const payStack = (req, res) => {
  var refNo= req.params['refNo']
  var token = req.headers.authorization.split(' ')[1];
  var payload = null;
      payload = jwt.decode(token, cfg.TOKEN_SECRET);
  var email = payload.user.email
 
  var config = {
      method: "get",
      url: `http://localhost:5000/paystack/${refNo}/${email}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
  }      

  module.exports = {
    login,
    register,
    getUser,
    getUsers,
    getUser,
    deleteUser,
    getAnalytics,
    payStack
  }
