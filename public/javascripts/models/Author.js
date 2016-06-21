define(["backbone"], function(Backbone) {
  var Author = Backbone.Model.extend({
    defaults: {
      "first_name":   "",
      "last_name":    "",
      "email":        "",
      "institution" : ""
    },
    idAttribute: "_id"
  });
  
  return Author;
});