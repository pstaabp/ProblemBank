define(["backbone","models/Problem"], function(Backbone,Problem) {
  var ProblemList = Backbone.Collection.extend({
    model: Problem,
    url: "/api/problems"

  });
  return ProblemList;
}); 