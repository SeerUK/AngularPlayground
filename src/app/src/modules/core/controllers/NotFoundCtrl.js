(function(angular) {

    "use strict";

    angular.module("ap.modules.core")
        .controller("NotFoundCtrl", function($scope, FlashMessenger) {
            $scope.message = FlashMessenger.get("error.not-found.message")
        })
    ;

})(angular);
