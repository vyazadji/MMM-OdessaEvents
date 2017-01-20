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
  // Subclass start method.
  /*
  start: function() {
  },
  */

  socketNotificationReceived: function(notification, payload) {
    //console.log("+++Receve socket notification from UI: " + notification);
    if (notification === 'SET_CONFIG') {
      this.getEvents();
    }
  },

  getEvents: function() {
   url = 'http://www.kassir24.com.ua/'; //TODO move in config ???

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

   var self = this;

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request
        if(!error){

            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            var events_html = $('#events-bx').html();
            /*
            $('#events-bx').each(function(i, elem) {
              var $poster = $(this);

              titles.push($poster.find('.line1').text());
            });
            */


            self.sendSocketNotification("EVENTS_HTML", {
              events_html: events_html
            });
        }
    });
  }
});
