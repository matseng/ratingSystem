// restaurantView.js

var app = app || {};

app.RestaurantView = Backbone.View.extend({
  
  tagName: 'tr',
  
  template: _.template( $('#restaurant-template').html() ),
  
  initialize: function() {},

  events: {},
  
  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
    this.addListeners();
    return this;
  },

  addListeners: function() {
    this.changeRatingListener();
    this.deleteListener();
  },

  changeRatingListener: function() {
    var self = this;
    var yourRatingPrev;
    var yourRating;
    var $selectEl = this.$el.find('.yourRating');
    $selectEl.on('change', function() {
      yourRatingPrev = yourRating || '-';
      yourRating = parseInt($selectEl.val());
      // console.log(yourRatingPrev, yourRating);
      this.model.set({'yourRating': yourRating, 'yourRatingPrev': yourRatingPrev});
      this.updateRestaurantRating();
    }.bind(this));
  },

  deleteListener: function() {
    var self = this;
    var $deleteButtonEl = self.$el.find('.deleteButton');
    $deleteButtonEl.on('click', function() {
      var restModel = self.model;
      restModel.destroy({
        wait: true, 
        error: function(){alert('Connection error: restaurant was not deleted')},
        success: function(model, res, options) {
          console.log(res);
          self.remove();
        }
      });
    });
  },

  updateRestaurantRating: function() {
    var self = this;
    self.model.save();
    // console.log(self.model.attributes);
  }

});