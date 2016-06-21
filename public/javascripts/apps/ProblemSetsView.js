// This is the main code for the viewing Problems Sets page based on a Backbone.View

define(["module","backbone","jquery","models/ProblemSet","models/ProblemSetList",
        "views/CollectionTableView",
        "bootstrap-markdown","stickit"], 
function(module,Backbone,$,ProblemSet,ProblemSetList,
         CollectionTableView) {
  var ProblemSetsView = Backbone.View.extend({
    el: "#content",
    initialize: function() {
      var self = this; 
      this.problemSets = new ProblemSetList(module.config().problem_sets); 
      
      this.setupTable(); 
      this.problemSetsTable = new CollectionTableView({collection: this.problemSets,
                                                       columnInfo: this.tableCols,
                                                       row_id_field: "_id",
                                                       table_classes: "table"}); 
      this.render();
    },
    render: function (){
      var self = this;
      this.$el.html($("#problem-sets-template").html());
      this.$("#table-container").append(this.problemSetsTable.render().el); 

    },
    setupTable: function(){
      this.tableCols = [
        {name: "name", key: "name", classname: "name"},
        {name: "delete", key:"delete", stickit_options : {
             
        }
      ]; 
    }
    
  });
  
  var psView = new ProblemSetsView();
}); 