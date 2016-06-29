// This is the main code for the AddProblem page based on a Backbone.View

define(["module","backbone","jquery","underscore","mathjax","models/Author","models/AuthorList",
        "models/ProblemList","models/ModuleList","models/Problem","markdown",
        "bootstrap-markdown","stickit","jquery-ui"],
       function(module,Backbone,$,_,MathJax,Author,AuthorList,ProblemList,ModuleList,Problem,markdown_it) {
  var AddProblemView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      var self = this;
      this.authorList = new AuthorList(module.config().authors);
      this.problemList = new ProblemList(module.config().problems);
      this.moduleList = new ModuleList(module.config().modules);
      this.addAuthorTemplate =  $("#add-author-template").html();

      // If a problem_id is defined, then it is an Edit problem, else it is a new problem.
      this.edit = ! _.isUndefined(module.config().problem_id)
      this.model = this.edit ?  this.problemList.get(module.config().problem_id): new Problem();

      this.model.on("sync",function(){
        console.log("in sync");
        $("#message").html(this.edit?"Updated the Problem":"Saved the Problem")
                    .show("slide",{direction: "up"})
                    .delay(20000).hide("slide",{direction: "up"});
        if(!self.edit){
          self.model = new Problem();
          self.stickit();
        }
      });

      this.render();
      this.addAuthorView = new AddAuthorView({el: this.$("#add-author-modal"), template: this.addAuthorTemplate});
    },
    render: function (){
      var self = this;
      this.$el.html($("#add-problem-template").html());
      if(this.edit){
        this.$("#add-problem-button").html("Update Problem in DB");
      } else {
        this.$("#add-problem-button").html("Add Problem to DB");
      }

      // set up the text and solution textareas to have markdown editors
      this.$("#text").markdown({
        onPostProcess: function() { MathJax.Hub.Queue(["Typeset",MathJax.Hub]);},
        onPreview: function(e){
          var md = markdown_it();
          return md.render(e.getContent());
        }

      });
      this.$("#solution").markdown({
        onPostProcess: function() { MathJax.Hub.Queue(["Typeset",MathJax.Hub]);},
        onPreview: function(e){
          var md = markdown_it();
          return md.render(e.getContent());
        }

      });
      this.stickit();
    },
    events: {
      "show.bs.modal #add-author-modal": "addNewAuthor",
      "click #add-problem-button": "addProblem"
    },
    bindings: {
      "#author": { observe: "author_id", selectOptions: { collection: function () {
          return this.authorList.map(function(au) {
            return {value: au.get("_id") , label: au.get("first_name") + " " + au.get("last_name")}; }); },
                                                         defaultOption: {value: null, label: "Choose Author..."}}},
      "#modules": { observe: "module_id", selectOptions: { collection: function () {
          return this.moduleList.map(function(mod) {
            return {value: mod.get("_id") , label: mod.get("name")}; }); },
                                                         defaultOption: {value: null, label: "Choose Module..."}}},
      "#text": "text_md",
      "#solution": "solution_md",
      ".problem-type": "type"
    },
    addProblem: function () {
      this.problemList.add(this.model);
      this.model.save();
    },
    addNewAuthor: function () {
      this.newAuthor = new Author();
      this.authorList.add(this.newAuthor);
      this.addAuthorView.set({model: this.newAuthor});
      this.addAuthorView.render();

    }


  });

  var AddAuthorView = Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template;
    },
    render: function () {
      this.$(".modal-body").html(this.template);
      this.stickit();
    },
    bindings: {
      "#author-first-name": "first_name",
      "#author-last-name": "last_name",
      "#author-email": "email",
      "#author-institution": "institution"
    },
    events: {
      "click #save-new-author-button": "saveAuthor"
    },
    saveAuthor: function() {
      var self = this;
      this.model.save(this.model.attributes, {success: function() {
        self.$el.modal('hide');
      }});
    },
    set: function(options){
      _(this).extend(_(options).pick("model")); // copy only the model option to the this object.
    }
  });

  var problemView = new AddProblemView();

});
