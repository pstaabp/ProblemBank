define(["backbone"], function(Backbone) {
  var Problem = Backbone.Model.extend({
    defaults: {
      "module_id"   :  "",
      "author_id"   :  "",
      "text_md"     :  "",
      "text_latex"     :  "",
      "solution_md" :  "",
      "solution_latex" :  "",
      "description": "",
      "type": []
    },
    idAttribute: "_id",
    latex: function(){
      $.ajax("/api/problems/" + this.get("_id") + "/latex",{type: "POST",success: function(data)     {console.log("yeah!");console.log(data);}});
      //$.ajax("/problems",{success: function(data) {console.log("yeah!");console.log(data);}});
    }
  });
  
  return Problem;
});