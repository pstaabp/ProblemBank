define(["backbone","models/Module"], function(Backbone,Module) {
  var ModuleList = Backbone.Collection.extend({
    model: Module,
    url: "/api/modules"

  });
  return ModuleList;
}); 