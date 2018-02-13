var express = require('express');
var router = express.Router();

// Adds support for GET requests to our webhook
router.get('/', (req, res) => {

  // Your verify token. Should be a random string.
  var VERIFY_TOKEN = "3b1eRsx84s"
    
  // Parse the query params
  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

module.exports = router;
