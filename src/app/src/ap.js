(function(angular) {

    "use strict";

    angular.module("ap", [ "ap.modules.core", "ap.modules.blog", "ui.router" ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/404/");
        })
    ;

})(angular);
