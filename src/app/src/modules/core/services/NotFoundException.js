(function() {

    "use strict";

    angular.module("ap.modules.core")
        .factory("NotFoundException", function(Exception) {

            var NotFoundException = function(previous, subject, identifier) {
                this.identifier = identifier;
                this.previous = previous;
                this.subject = subject;
            }

            NotFoundException.prototype = new Exception();
            NotFoundException.prototype.constructor = NotFoundException;

            return NotFoundException;
        })
    ;

})(angular);
