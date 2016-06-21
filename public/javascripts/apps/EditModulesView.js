// This is the main code for the AddProblem page based on a Backbone.View

define(["module","backbone","underscore","models/Module","models/ModuleList",
        "bootstrap-markdown","stickit"], 
       function(module,Backbone,_,Module,ModuleList) {
  var EditModulesView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      this.moduleList = new ModuleList(module.config().modules);
      this.moduleList.on("remove",this.renderModules,this);
      this.moduleList.on("add",this.renderModules,this);
      console.log(this.moduleList.pluck("name"));
      this.addModuleTemplate = $("#add-module-template").html();
      this.viewModuleTemplate = $("#view-module-template").html();
      // create a model for the author list and module list
      //this.model = new Backbone.Model({authors: this.authorList});
      
      this.render();
      this.addModuleView = new AddModuleView({el: this.$("#add-module-modal"), collection: this.moduleList,
                                              template: this.addModuleTemplate}); 
    },
    render: function (){
      this.$el.html($("#edit-modules-template").html());
      this.renderModules();
      // set up the text and solution textareas to have markdown editors
      //this.stickit();
    },
    renderModules: function () {
      var self = this; 
      this.$("#module-list tbody").html(""); 
      this.moduleList.forEach(function(module) {
        self.$("#module-list tbody").append(new ModuleView({template: self.viewModuleTemplate, model: module}).render().el); 
      }); 
    },    
    events: {
      "show.bs.modal #add-module-modal": "addNewModule",
      "click #select-all": "selectAll",
      "click #delete-modules-button": "deleteModules"
    },
    addNewModule: function () {
      this.addModuleView.render();
    },
    selectAll: function () { 
        this.$(".select-module").prop("checked",this.$("#select-all").prop("checked")); 
    },
    deleteModules: function () {
      var self = this; 
      var ids = this.$(".select-module:checked").map(function(i,elem) { return self.$(elem).data("module-id");});
      _(ids).each(function(id){
        var _module = self.moduleList.get(id);
        _module.destroy();
      }); 
      
    }
    
    
  });
  
  var AddModuleView = Backbone.View.extend({
    initialize: function (options) {
      _(this).extend(_(options).pick("template","collection"));  // copy the template to the this object. 
    },
    render: function () {
      this.$(".modal-body").html(this.template);  
      this.model = new Module();
      this.stickit();
    }, 
    bindings: {
      "#module-name": "name"
    },
    events: {
      "click #save-new-module-button": "saveModule"
    },
    saveModule: function() {
      var self = this; 
      this.collection.add(this.model);
      this.model.save(this.model.attributes, {success: function() {
        self.$el.modal('hide');
      }});
    }
  }); 

  
  var ModuleView = Backbone.View.extend({
    tagName: "tr",
    initialize: function (options) {
      var self = this;
      _(this).extend(_(options).pick("template","model"));  // copy the template to the this object. 
      this.model.on("change", function () {
        self.model.save();  
      }).on("sync",function(){
        self.$(".select-module").attr("data-module-id",self.model.get("_id"));      
      }); 
    },
    render: function() {
      this.$el.html(this.template);
      this.$(".select-module").attr("data-module-id",this.model.get("_id")); 
      this.$(".edit-button").button(); 
      this.stickit(); 
      return this;
    },
    bindings: { ".module-name": "name"},
    events: {
      "click .edit-button": "editModule"
    },
    editModule: function() {
      if (this.$(".edit-button").text() == "Edit") {
        this.$(".module-name").attr("contentEditable","true").focus();  
        this.$(".edit-button").button("save"); 
      } else {
        this.model.set("name",this.$(".module-name").attr("contentEditable","false").text()); 
        this.$(".edit-button").button("reset"); 
        
      }
    }
  }); 
    
  var editModulesApp = new EditModulesView(); 

});