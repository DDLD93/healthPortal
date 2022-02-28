// this is the configuration file
module.exports = {
    // 1. MongoDB
   
  
    // web token
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',
  
    // 3. Express listening  Port
    LISTEN_PORT: process.env.LISTEN_PORT || 4000,

    AUTH: process.env.AUTH_SERVICES || "auth:5000",
    FORMS: process.env.FORMS_SERVICES || "forms:3000"
  };