define(["backbone","models/ProblemSet"], function(Backbone,ProblemSet) {
  var ProblemSetList = Backbone.Collection.extend({
    model: ProblemSet,
    url: "/api/problemsets",
    initialize: function(models,options){
      _(this).extend(_(options).pick("all_problems")); 
      return this;
    }
  });
  return ProblemSetList;
}); 