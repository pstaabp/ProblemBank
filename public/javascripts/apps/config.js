/***
 *  This object contains many common things needed by all other objects
 *
 **/


define(['backbone'], function(Backbone){

    $(document).ajaxError(function (e, xhr, options, error) {
        if(xhr.status==503){
            alert("It doesn't appear that Dancer is running. See the installation guide at http://webwork.maa.org to fix this.");
        }
    });
    
    var config = {
         sortIcons: {
            "string1": "fa fa-sort-alpha-asc",
            "string-1": "fa fa-sort-alpha-desc",
            "integer1": "fa fa-sort-numeric-asc",
            "integer-1": "fa fa-sort-numeric-desc",
            "boolean1": "fa fa-sort-amount-asc",
            "boolean-1": "fa fa-sort-amount-desc", 
            "none1": "fa fa-sort-amount-asc",
            "none-1": "fa fa-sort-amount-desc"
        }

    }; 
    
    return config;
});