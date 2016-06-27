// This is the main code for the AddProblem page based on a Backbone.View

define(["module","backbone","jquery","mathjax","models/AuthorList",
        "models/ProblemList","models/ModuleList",
        "models/ProblemSet","models/ProblemSetList","views/ProblemView",
        "bootstrap-markdown","stickit"],
       function(module,Backbone,$,MathJax,AuthorList,ProblemList,ModuleList,ProblemSet,ProblemSetList,ProblemView) {
  var ProblemSetView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      var self = this;
      this.authorList = new AuthorList(module.config().authors);
      this.problemList = new ProblemList(module.config().problems);
      this.moduleList = new ModuleList(module.config().modules);
      this.problemSets = new ProblemSetList(module.config().problem_sets,{parse: true,all_problems:this.problemList}); // make sure that all_problems is passed in.
      this.model = this.problemSets.findWhere({_id: module.config().set_id});
      this.render();
    },
    render: function (){
      var self = this;
      this.$el.html($("#list-problems-template").html());

      this.$("#problems-container ul").html();

      this.model.get("problems").each(function(prob){
        self.$("#problems-container ul.problem-list").append(new ProblemView({model: prob}).render().el);
      });
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
      this.stickit();
    },
    events: {
      "show.bs.modal #add-author-modal": "addNewAuthor",
      "click #add-problem-button": "addProblem",
      "click .latex-all": "latexProblems",
      "click #new-problem-set-button": "createNewProblemSet"
    },
    latexProblems: function() {
      $.ajax("/api/problemsets/" + this.model.get("_id") + "/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});

    },
    bindings: {
      "#set-type": "type",
      "#set-name": "name"
    },
    createNewProblemSet: function(){
      var self = this;
      this.$("#new-problem-set-button").attr("disabled","disabled").button("saving");
      // check to see if new_set_name is already a set name
      var newProblemSet = new ProblemSet({name: this.model.get("new_set_name")});
      this.problemSets.add(newProblemSet);
      newProblemSet.save({success: function(data) {
        self.$("#new-problem-set-button").button("reset");
        console.log("yeah");
        console.log(data);

      }});
    }
  });
   var psv = new ProblemSetView();

});
