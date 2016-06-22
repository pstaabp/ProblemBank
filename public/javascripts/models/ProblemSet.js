define(["backbone","models/ProblemList"], function(Backbone,ProblemList) {
  var ProblemSet = Backbone.Model.extend({
    defaults: {
      "name"   :  "",
      "problems"   : new ProblemList([]),  // stores the _id's of the problems in the set
    },
    idAttribute: "_id",
    latex: function(){
      $.ajax("/api/problemsets/" + this.get("_id") + "/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});
    },
    parse: function(data){
      this.set("problems", new ProblemList(data.problems)); 
      delete data.problems; 
      return data; 
    },
    toJSON: function() {
      var attrs = _(this.attributes).clone(); 
      attrs.problems = this.get("problems").pluck("_id"); 
      return attrs;
    }
  });
  
  return ProblemSet;
});