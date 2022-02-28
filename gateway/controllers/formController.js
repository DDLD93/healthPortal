const axios = require("axios").default;
var cfg = require("../cfg");



const forms = (req, res) => {
  var config = {
    method: "get",
    url: `http://${cfg.FORMS}/getforms`,
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
       url: `http://${cfg.FORMS}/getform/${email}`,
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