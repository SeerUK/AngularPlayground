(function(angular) {

    "use strict";

    angular.module("ap.modules.core")
        .factory("HttpException", function(Exception) {

            var HttpException = function(previous, message, status) {
                this.message = message;
                this.previous = previous;
                this.status = status;
            }

            HttpException.prototype = new Exception();
            HttpException.prototype.constructor = HttpException;

            return HttpException;
        })
    ;

})(angular);
