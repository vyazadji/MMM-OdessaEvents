Module.register("MMM-OdessaEvents",{

  // Default module config.
  defaults: {
    visibleItems: 6
    //text: "Hello World, Odessa!"
  },

  // Define required translations.
  getTranslations: function() {
    return false;
  },

  // Subclass getStyles method.
  getStyles: function () {
    return ["MMM-OdessaEvents.css"];
  },

  start: function(){
    this.events_html = "<span>Загрузка мероприятий</span>";
  },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.events_html;
    return wrapper;
  },

  notificationReceived: function(notification, payload, sender) {
    if(notification === 'DOM_OBJECTS_CREATED'){
      this.sendSocketNotification('SET_CONFIG', this.config);
    }
  },

  // Override socket notification handler.
  socketNotificationReceived: function(notification, payload) {
    if (notification === "EVENTS_HTML") {
      this.events_html = payload.events_html;
      this.updateDom();
      this.startSlider();
    }
  },

  startSlider: function () {
    this.firstVisibleItem = 0;

    var $items = $(".MMM-OdessaEvents li.event");

    $items.hide();
    $items.slice(this.firstVisibleItem, this.firstVisibleItem + this.config.visibleItems).show();

    clearInterval(this.timerId);

    this.timerId = setInterval(function(){
      var $items = $(".MMM-OdessaEvents li.event");

      if (this.firstVisibleItem > $items.length) {
        this.firstVisibleItem = 0;
      }

      $items.hide();
      $items.slice(this.firstVisibleItem, this.firstVisibleItem + this.config.visibleItems).show();


      this.firstVisibleItem = this.firstVisibleItem + this.config.visibleItems;
    }.bind(this), 30 * 1000);

  }
});

