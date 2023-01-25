/// <reference types="cypress" />

module.exports = (on, config) => {
  on('task', {

    // this plugin just for demonstration
    echo: (message) => {
      console.log('echo to Node.js console', message);
      return new Promise((done) => {
        // return message back to browser
        done(message);
      });
    }
    
  })

};
