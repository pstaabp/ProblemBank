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
      this.model.on("change", function(_model){
        _model.save();
      });
    },
    render: function (){
      var self = this;
      this.$el.html($("#list-problems-template").html());

      this.$("#problems-container ul").html("");
      this.$("#solutions-container ul").html("");

      this.model.get("problems").each(function(prob){
        self.$("#problems-container ul.problem-list").append(new ProblemView({model: prob, show:"problem"}).render().el);
        self.$("#solutions-container ul.problem-list").append(new ProblemView({model: prob, show:"solution"}).render().el);
      });

      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
      this.stickit();
    },
    events: {
      "show.bs.modal #add-author-modal": "addNewAuthor",
      "click #add-problem-button": "addProblem",
      "click #latex-button": "latexProblems",
      "click #solutions-button": "latexProblems",
      "click #log-button": "showLog",
      "click #new-problem-set-button": "createNewProblemSet"
    },
    latexProblems: function(evt) {
      var self = this;
      var target = $(evt.target);
      var solution_clicked = (evt.target.id=="solutions-button");
      var url ="/api/problemsets/" + this.model.get("_id") + "/latex";
      if (solution_clicked){
        url += "?solution=true"
      }
      $.ajax(url,{type: "POST",success: function(data){
        var logButton = solution_clicked ? "#solutions-log-button": "#log-button";
        var outButton = solution_clicked ? "#solutions-output-button" : "#output-button";
        if (data.errors==1){
          self.$(logButton).removeAttr("disabled");
          self.$(outButton).attr("disabled","disabled");
          self.log = data.log;
          //
        } else {
          self.$(outButton).attr("href",data.pdf).attr("target","_blank").removeAttr("disabled");
          self.$(logButton).attr("disabled","disabled");
        } }});

    },
    showLog: function() {
      this.$("#latex-log-modal .modal-body").html(this.log)
      this.$("#latex-log-modal").modal("show");
    },
    bindings: {
      "#set-type": "type",
      "#set-name": {observe: "name", events: ["blur"]},
      "#institution": {observe:"institution", events: ["blur"]},
      "#set-header": {observe:"header",  events: ["blur"]},
      "#instructor": {observe: "instructor", events: ["blur"]},
      "#course-name": {observe: "course_name", events: ["blur"]},
      "#date": {observe: "date", events: ["blur"]}
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
