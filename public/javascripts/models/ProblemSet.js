define(["backbone"], function(Backbone) {
  var ProblemSet = Backbone.Model.extend({
    defaults: {
      "name"   :  "",
      "problems"   :  [],  // stores the _id's of the problems in the set
    },
    idAttribute: "_id",
    latex: function(){
      $.ajax("/api/problemsets/" + this.get("_id") + "/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});
    }
  });
  
  return ProblemSet;
});