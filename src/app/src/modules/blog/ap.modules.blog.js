(function(angular) {

    "use strict";

    angular.module("ap.modules.blog", [ "ui.router" ])
        .run(function($rootScope, $state, FlashMessenger, NotFoundException) {
            $rootScope.$on(
                "$stateChangeError",
                function(event, toState, toParams, fromState, fromParams, error) {
                    if (error instanceof NotFoundException) {
                        FlashMessenger.set("error.not-found.message", error.message);
                        return $state.go("core.not-found");
                    }

                    // Maybe wrap this in a debug flag?
                    console.error("Unhandled error: ", error);
                    throw error;

                    // Catch all remaining errors
                    return $state.go("core.not-found");
                }
            );
        })
    ;

})(angular);
