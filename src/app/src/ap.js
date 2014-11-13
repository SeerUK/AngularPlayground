(function(angular) {

    "use strict";

    angular.module("ap", [ "ap.modules.core", "ap.modules.blog", "ui.router" ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise("/404/");
        })
    ;

})(angular);
