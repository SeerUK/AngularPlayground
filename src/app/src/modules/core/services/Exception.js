(function(angular) {

    "use strict";

    angular.module("ap.modules.core")
        .factory("Exception", function() {

            var Exception = function(previous, message) {
                this.message = message;
                this.previous = previous;
            }

            Exception.prototype = new Error();
            Exception.prototype.constructor = Exception;

            return Exception;
        })
    ;

})(angular);
