/* Magic Mirror
 * Node Helper: MMM-OdessaEvents
 *
 * By Vasiliy Yazadji
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');
var cheerio = require('cheerio');

module.exports = NodeHelper.create({
  socketNotificationReceived: function(notification, payload) {
    //console.log("+++Receve socket notification from UI: " + notification);
    if (notification === 'SET_CONFIG') {
      this.getEvents();
    }
  },

  getEvents: function() {
    var url = 'http://www.kassir24.com.ua/';

    var self = this;
    request(url, function(error, response, html){

      // First we'll check to make sure no errors occurred when making the request
      if(!error){
        var $ = cheerio.load(html);
        var events_html = $('#events-bx').html();
        self.sendSocketNotification("GET_ODESSA_EVENTS", {
          events_html: events_html
        });
      } else {
        console.log("Error in module " + this.name + ": " + error);
      }
    });
  }
});
