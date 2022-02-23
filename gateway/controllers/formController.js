const axios = require("axios").default;



// const newform = (req, res) => {
//   var newurl = 'http://localhost:3000/newform';
//   request(newurl).pipe(res);
  
// };

const forms = (req, res) => {
  var config = {
    method: "get",
    url: "http://localhost:3000/getforms",
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error)
    });
};

const form = (req, res) => {
    var email = req.params['email']
   
     var config = {
       method: "get",
       url: `http://localhost:3000/getform/${email}`,
       headers: {
         "Content-Type": "application/json",
       },
     };
   
     axios(config)
       .then(function (response) {
         res.send(response.data);
       })
       .catch(function (error) {
        res.send(error)
       });
   }

   module.exports = {
   // newform,
    forms,
    form
  }