(function(angular) {

    "use strict";

    angular.module("ap.modules.blog", [ "ui.router" ])
        .run(function($rootScope, $state, FlashMessenger) {
            $rootScope.$on(
                "$stateChangeError",
                function(event, toState, toParams, fromState, fromParams, error) {
                    FlashMessenger.set("error.not-found.message", error);

                    $state.go("core.not-found");
                }
            );
        })
    ;

})(angular);
