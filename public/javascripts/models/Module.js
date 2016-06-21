define(["backbone"], function(Backbone) {
  var Module = Backbone.Model.extend({
    defaults: {
      "name":   "",
    },
    idAttribute: "_id"
  });
  
  return Module;
});