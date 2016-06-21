define(["backbone","models/Author"], function(Backbone,Author) {
  var AuthorList = Backbone.Collection.extend({
    model: Author,
    url: "/api/authors"

  });
  return AuthorList;
}); 