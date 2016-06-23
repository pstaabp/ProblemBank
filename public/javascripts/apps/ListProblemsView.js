// This is the main code for the AddProblem page based on a Backbone.View

define(["module","backbone","jquery","models/AuthorList","markdown",
        "models/ProblemList","models/ModuleList", "views/ProblemView",
        "models/ProblemSet","models/ProblemSetList",
        "bootstrap-markdown","stickit"], 
       function(module,Backbone,$,AuthorList,markdown,ProblemList,ModuleList,ProblemView,ProblemSet,ProblemSetList) {
  var ListProblemsView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      var self = this; 
      this.authorList = new AuthorList(module.config().authors);
      this.problemList = new ProblemList(module.config().problems);
      this.moduleList = new ModuleList(module.config().modules);
      this.problemSets = new ProblemSetList(module.config().problem_sets,{parse: true,all_problems:this.problemList}); // make sure that all_problems is passed in. 
      this.model = new Backbone.Model({set_id: null, new_set_name: "", problem_set: null});
      this.model.on("change:set_id",function() {
        self.model.set("problem_set",self.problemSets.findWhere({_id: self.model.get("set_id")}));   
      });
      this.render();
    },
    render: function (){
      var self = this;
      this.$el.html($("#list-problems-template").html());
      
      this.$("#problems-container ul").html();
      
      this.problemList.each(function(prob){
        self.$("#problems-container ul.problem-list").append(new ProblemView({model: prob, parent: self}).render().el); 
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
      $.ajax("/api/problems/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});
    
    }, 
    bindings: { 
      "#target-problem-set": { observe: "set_id", 
                        selectOptions: { collection: function () { 
                          return this.problemSets.map(function(_set) { 
                            return {label: _set.get("name"), value: _set.get("_id")}});
                          }, 
                                defaultOption: {value: null, label: "Select Target Set..."}
                                              }},
      "#new-set-name": "new_set_name"
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
    
   var listProblemsView = new ListProblemsView(); 

});