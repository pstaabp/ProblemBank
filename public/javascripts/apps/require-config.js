/*  This is the configuration for the require.js loading.  See requirejs.org for more info. 

  It should be loaded directly before the require.js is loaded in a page.  */

var require = {
    paths: {
        "backbone":             "/javascripts/bower_components/backbone/backbone", // backbone.stickit requires a lower-case "b"
        //"backbone-validation":  "/javascripts/bower_components/backbone-validation/dist/backbone-validation",
        //"jquery-ui":            "/javascripts/bower_components/jquery-ui/jquery-ui",
        "underscore":           "/javascripts/bower_components/underscore/underscore",
        "jquery":               "/javascripts/bower_components/jquery/dist/jquery",
        "bootstrap":            "/javascripts/bower_components/bootstrap/dist/js/bootstrap",
        //"markdown":             "/javascripts/bower_components/markdown-js/dist/markdown.min",
        "markdown":             "/javascripts/bower_components/markdown-it/dist/markdown-it",
        "bootstrap-markdown":   "/javascripts/bootstrap-markdown",
        "BackboneCollectionTable": "/javascripts/BackboneCollectionTable",
        //"moment":               "/javascripts/bower_components/moment/moment",
        "stickit":              "/javascripts/bower_components/backbone.stickit/backbone.stickit",
        "views":                "/javascripts/views",
        "models":               "/javascripts/models",
        "apps":                 "/javascripts/apps",
        //"config":               "/javascripts/apps/config"
    },
    //urlArgs: "bust=" +  (new Date()).getTime(),
    waitSeconds: 5,
    shim: {
        //'jquery-ui': ['jquery'],
        //'jquery-ui-custom': ['jquery'],
        'underscore': { exports: '_' },
        'backbone': { deps: ['underscore', 'jquery'], exports: 'backbone'},
        'bootstrap':['jquery'], // saying that bootstrap requires jquery-ui makes bootstrap (javascript) buttons work.
        'bootstrap-markdown': ['bootstrap','markdown'],
        //'backbone-validation': ['backbone'],
        //'moment': {exports: 'moment'},
        //'config': {deps: ['moment','backbone-validation'], exports: 'config'},
        'stickit': ["backbone","jquery"],
        //'datepicker': ['bootstrap'],
        //'jquery-truncate': ['jquery'],
        //'editablegrid': {deps: ['jquery'], exports: 'EditableGrid'},
        //'blob': {exports : 'Blob'},
        //'imagesloaded': ['jquery'],
        //'knowl': ['jquery']
    }
};