define(["backbone","models/ProblemSet"], function(Backbone,ProblemSet) {
  var ProblemSetList = Backbone.Collection.extend({
    model: ProblemSet,
    url: "/api/problemsets",
//    parse: function(response,options){
//      console.log(response);
//      console.log(options);
//      return response; 
//      
//    }

  });
  return ProblemSetList;
}); 