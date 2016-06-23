define(["backbone","jquery","markdown"], function(Backbone,$,markdown) {
  var ProblemView = Backbone.View.extend({
    tagName: "li",
    className: "problem",
    template: _.template($("#problem-template").html()),
    initialize: function(options) {
      _(this).extend(_(options).pick("parent"));
    },
    render: function() {
      var md = markdown();
      this.$el.html(this.template({_id: this.model.get("_id")}));
      this.$(".problem-viewer").html(md.render(this.model.get("text_md")));
      
      return this;
    },
    events: {
      "click .latex-button": "latexProblem",
      "click .delete-button": "deleteProblem",
      "click .add-button": "addProblemToSet"
    },
    addProblemToSet: function() {
        this.parent.model.get("problem_set").get("problems").add(this.model)
        this.parent.model.get("problem_set").save();
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

  return ProblemView;
}); 