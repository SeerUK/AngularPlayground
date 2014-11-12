(function(angular) {

    "use strict";

    angular.module("ap", [ "ap.modules.blog", "ui.router" ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
        })
        .run(function($state) {
            $state.go("blog.article-list");
        })
    ;

})(angular);
