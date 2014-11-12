(function(angular) {

    "use strict";

    angular.module("ap.modules.core")
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("core", {
                    abstract: true,
                    controller: "AbstractCoreCtrl",
                    templateUrl: "app/src/modules/core/resources/views/master.html"
                })

                .state("core.not-found", {
                    controller: "NotFoundCtrl",
                    templateUrl: "app/src/modules/core/resources/views/not-found.html",
                    url: "/404/"
                })
            ;
        })
    ;

})(angular);
