define(["backbone","models/ProblemList"], function(Backbone,ProblemList) {
  var ProblemSet = Backbone.Model.extend({
    defaults: {
      "name"   :  "",
      "problems"   : new ProblemList([]),  // stores the _id's of the problems in the set
      "date": "",
      "institution": "",
      "instructor": "",
      "course_name": "",
      "header": ""
    },
    idAttribute: "_id",
    latex: function(){
      $.ajax("/api/problemsets/" + this.get("_id") + "/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});
    },
    parse: function(data){
      var self = this;
      var problems = new ProblemList(); // this is the ProblemList that stores the problems.
      _(data.problems).each(function(_probid){
          problems.add(self.collection.all_problems.findWhere({_id: _probid}));
      });
      data.problems = problems;
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
