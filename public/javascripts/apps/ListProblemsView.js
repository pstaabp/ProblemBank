// This is the main code for the AddProblem page based on a Backbone.View

define(["module","backbone","jquery","mathjax","models/AuthorList","markdown",
        "models/ProblemList","models/ModuleList", "views/ProblemView",
        "models/ProblemSet","models/ProblemSetList",
        "bootstrap-markdown","stickit"],
       function(module,Backbone,$,MathJax,AuthorList,markdown,ProblemList,ModuleList,ProblemView,ProblemSet,ProblemSetList) {
  var ListProblemsView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      var self = this;
      this.authorList = new AuthorList(module.config().authors);
      this.problemList = new ProblemList(module.config().problems);
      this.moduleList = new ModuleList(module.config().modules);
      this.problemSets = new ProblemSetList(module.config().problem_sets,{parse: true,all_problems:this.problemList}); // make sure that all_problems is passed in.
      this.model = new Backbone.Model({set_id: null, new_set_name: "", problem_set: null, module_id: null});
      this.model.on("change:set_id",function() {
        self.model.set("problem_set",self.problemSets.findWhere({_id: self.model.get("set_id")}));
      }).on("change:module_id", this.filterByModule,this);

      this.render();
      this.newSetModal = new NewProblemSetView({template: $("#new-problem-set-template").html(),
                                                collection: this.problemSets,
                                                el: $("#add-problem-set-modal")});
      this.problemSets.on("sync",function(_model){
        self.model.set("set_id",_model.get("_id"));
        $("#message").html("Problem Added")
                    .show("slide",{direction: "up"})
                    .delay(20000).hide("slide",{direction: "up"});

        self.stickit();
      });
    },
    render: function(){
      var self = this;
      this.$el.html($("#list-problems-template").html());

      this.$("#problems-container ul").html("");

      if(this.problemsToShow){
       _(this.problemsToShow).each(function(prob){
         self.$("#problems-container ul.problem-list").append(new ProblemView({model: prob, parent: self}).render().el);
       });
      } else {
        this.problemList.each(function(prob){
          self.$("#problems-container ul.problem-list").append(new ProblemView({model: prob, parent: self}).render().el);
        });
      }
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
      this.stickit();
    },
    events: {
      "show.bs.modal #add-problem-set-modal": "showNewSetModal"
    },
    bindings: {
      "#target-problem-set": { observe: "set_id",
                        selectOptions: { collection: function () {
                          return this.problemSets.map(function(_set) {
                            return {label: _set.get("name"), value: _set.get("_id")}});
                          },
                                defaultOption: {value: null, label: "Select Target Set..."}
                                              }},
      "#filter-problems": {observe: "module_id",
                            selectOptions: { collection: function() {
                              return this.moduleList.map(function(_module) {
                                return {label: _module.get("name"), value: _module.get("_id")};}); },
                            defaultOption: {value: null, label: "Select Module to Filter..."} }},
      "#new-set-name": "new_set_name"
    },
    filterByModule: function(){
        console.log(this.model.get("module_id"));
        this.problemsToShow = this.problemList.where({module_id: this.model.get("module_id")});
      this.render();
    },
    showNewSetModal: function(){
      var self = this;
      this.newSetModal.render();
    }
  });

    var NewProblemSetView = Backbone.View.extend({
      initialize: function(options){
        _(this).extend(_(options).pick("template"));
      },
      render: function() {
        this.$(".modal-body").html(this.template);
        this.model = new ProblemSet();
        this.stickit();
      },
      bindings: { "#new-problem-set-name": "name"},
      events: {"click #save-new-problem-set-button": "saveSet" },
      saveSet: function(){
        var self = this;
        this.collection.add(this.model);
        this.model.save(this.model.attributes,{success: function(data){
          console.log(data);
          self.$el.modal("hide");
        }});
      }

    });

   var listProblemsView = new ListProblemsView();

});
