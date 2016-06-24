// This is the main code for the viewing Problems Sets page based on a Backbone.View

define(["module","backbone","jquery","models/ProblemSet","models/ProblemSetList",
        "../CollectionTableView",
        "bootstrap-markdown","stickit"], 
function(module,Backbone,$,ProblemSet,ProblemSetList,
         CollectionTableView) {
  var ProblemSetsView = Backbone.View.extend({
    el: "#content",
    editTemplate: _.template($("#edit-set-template").html()),
    initialize: function() {
      var self = this; 
      this.problemSets = new ProblemSetList(module.config().problem_sets);
      this.problemSets.on("remove", function(_m){
          _m.destroy();
      }); 
      
      this.setupTable(); 
      this.problemSetsTable = new CollectionTableView({collection: this.problemSets,
                                                       columnInfo: this.tableCols,
                                                       row_id_field: "_id", paginator: {showPaginator: true},
                                                       table_classes: "table"}); 
      this.render();
    },
    render: function (){
      var self = this;
      this.$el.html($("#problem-sets-template").html());
      this.$("#table-container").append(this.problemSetsTable.render().el); 

    },
    setupTable: function(){
      var self = this;
      this.tableCols = [
        {name: "Delete", key:"delete", classname: "delete-set",
               stickit_options: {update: function($el, val, model, options) {
                    $el.html($("#delete-set-template").html());
                    $el.children(".btn").on("click",function() {
                      console.log(model);
                      model.destroy();});
                }}},
        {name: "Name", key: "name", classname: "name"},
        {name: "No. of Problems", key: "problems", classname: "num_probs",
              stickit_options: { onGet: function(probs) {
                  return probs.length;
              }}},
        {name: "Edit",key:"edit", classname: "edit", stickit_options: { update: function($el,val,model,options){
              $el.html(self.editTemplate({_id: model.get("_id")}));
        }}}
      ]; 
    }
    
  });
  
  var psView = new ProblemSetsView();
}); 