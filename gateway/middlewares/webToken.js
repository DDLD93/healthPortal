var cfg = require('../cfg');
const jwt = require('jsonwebtoken');
const moment = require('moment')
// token check and validation
function authClient(req, res, next) {
    // checking if token is present in request header
    if (!req.headers.authorization) {
      return res.status(401).send({ status:"failed",
      Message: "Token NotFound" });
    }
    //dividing token into substrings
    var token = req.headers.authorization.split(' ')[1];
  
    var payload = null;
    try {
      //trying to generate payload using client token and jwt secret key
      payload = jwt.decode(token, cfg.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(403).send({ status:"failed",
          Message: "Invalid Token" });
    }
    //checking the expiry state of token 
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ status:"failed",
      Message: "Expired Token" });
    }
    
        next();
  };
  function authAdmin(req, res, next) {
    // checking if token is present in request header
    if (!req.headers.authorization) {
      return res.status(401).send({ status:"failed",
      Message: "Token Missiing" });
    }
    //dividing token into substrings
    var token = req.headers.authorization.split(' ')[1];
  
    var payload = null;
    try {
      //trying to generate payload using client token and jwt secret key
      payload = jwt.decode(token, cfg.TOKEN_SECRET);
    }
    catch (err) {
      return res.status(403).send({ status:"failed",
          Message: "Invalid Token" });
    }
    //checking the expiry state of token 
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ status:"failed",
      Message: "Expired Token" });
    }
    
        next();
  };

  module.exports = { authAdmin,authClient }