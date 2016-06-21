define(["backbone","models/ProblemSet"], function(Backbone,ProblemSet) {
  var ProblemSetList = Backbone.Collection.extend({
    model: ProblemSet,
    url: "/api/problemsets"

  });
  return ProblemSetList;
}); 