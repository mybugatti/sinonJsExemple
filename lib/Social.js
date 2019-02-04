var Promise = require('promise');
var request = require('request');

module.exports = {

  twitter_url: 'http://api.plos.org/search?q=title:"Drosophila" AND body:"RNA"&fl=id&start=100&rows=100',
  facebook_url: 'https://www.chaijs.com/',

  getTwitterCount: function (url) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.callAPI(self.twitter_url + url).then(function (result) {
        resolve(result.response.numFound)
      })
    });
  },

  callAPI: function (url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, response, body) {
        if(!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          reject(error)
        }
      })
    });
  }

};