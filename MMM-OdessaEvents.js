Module.register("MMM-OdessaEvents",{

  // Default module config.
  defaults: {
    visibleItems: 6,
    rotateInterval: 10/*min*/ * 60 * 1000,
    updateEventsInterval: 24/*hours*/ * 60 * 60 * 1000
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
    this.events_html = "<span>Загрузка мероприятий ...</span>";
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
    if (notification === "GET_ODESSA_EVENTS") {
      this.events_html = payload.events_html;
      this.updateDom();
      this.startSlider();

      setTimeout(function(){
        this.sendSocketNotification('SET_CONFIG', this.config);
      }.bind(this), this.config.updateEventsInterval);
    }
  },


  startSlider: function () {
    this.firstVisibleItem = 0;
    if (this.timerId) clearInterval(this.timerId);

    this.rotateItems();

    this.timerId = setInterval(this.rotateItems.bind(this), this.config.rotateInterval);
  },

  rotateItems: function (){
    var $items = $(".MMM-OdessaEvents li.event");
    $items.hide();

    if (this.firstVisibleItem > $items.length) {
      this.firstVisibleItem = 0;
    }

    $items.slice(this.firstVisibleItem, this.firstVisibleItem + this.config.visibleItems).show();


    this.firstVisibleItem = this.firstVisibleItem + this.config.visibleItems;
  }
});

