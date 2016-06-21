// This is the main code for the AddProblem page based on a Backbone.View

define(["module","backbone","jquery","models/AuthorList","markdown",
        "models/ProblemList","models/ModuleList",
        "models/ProblemSet","models/ProblemSetList",
        "bootstrap-markdown","stickit"], 
       function(module,Backbone,$,AuthorList,markdown,ProblemList,ModuleList,ProblemSet,ProblemSetList) {
  var ListProblemsView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      var self = this; 
      this.authorList = new AuthorList(module.config().authors);
      this.problemList = new ProblemList(module.config().problems);
      this.moduleList = new ModuleList(module.config().modules);
      this.problemSets = new ProblemSetList(module.config().problem_sets); 
      this.model = new Backbone.Model({problem_set: null, new_set_name: ""});
      this.render();
    },
    render: function (){
      var self = this;
      this.$el.html($("#list-problems-template").html());
      
      this.$("#problems-container ul").html();
      
      this.problemList.each(function(prob){
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
      $.ajax("/api/problems/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});
    
    }, 
    bindings: { 
      "#target-problem-set": { observe: "problem_set", 
                        selectOptions: { collection: function () { 
                          return this.problemSets.pluck("name"); }, 
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
  
  var ProblemView = Backbone.View.extend({
    tagName: "li",
    className: "problem",
    template: _.template($("#problem-template").html()),
    render: function() {
      var md = markdown();
      this.$el.html(this.template(this.model.attributes));
      this.$(".problem-viewer").html(md.render(this.model.get("text_md")));
      
      return this;
    },
    events: {
      "click .latex-button": "latexProblem",
      "click .delete-button": "deleteProblem",
    },
    deleteProblem: function() {
      var self = this;
      var conf = confirm("Do you want to delete this problem?"); 
      if(conf){
          this.model.destroy({success: function(data) {
            console.log(data); 
            self.remove();
          }});
      }
                         
    },
    latexProblem: function (){
      this.model.latex();
    }
  }); 
  
   var listProblemsView = new ListProblemsView(); 

});