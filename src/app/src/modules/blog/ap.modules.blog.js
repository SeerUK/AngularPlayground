(function(angular) {

    "use strict";

    angular.module("ap.modules.blog", [ "ui.router" ])
        .run(function($rootScope, $state, FlashMessenger, NotFoundException) {
            $rootScope.$on(
                "$stateChangeError",
                function(event, toState, toParams, fromState, fromParams, error) {
                    if (error instanceof NotFoundException) {
                        FlashMessenger.set("error.not-found", error);
                    }

                    $state.go("core.not-found");
                }
            );
        })
    ;

})(angular);
