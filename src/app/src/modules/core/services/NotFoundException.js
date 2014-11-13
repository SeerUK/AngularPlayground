(function() {

    "use strict";

    angular.module("ap.modules.core")
        .factory("NotFoundException", function(Exception) {

            var generateMessage = function(subject, identifier) {
                var message = "Sorry, no " + subject + " found";

                if (typeof identifier === "object") {
                    var idKeys = Object.keys(identifier);
                    if (idKeys.length > 0) {
                        message += " with " + idKeys[0] +
                            " of \"" + identifier[idKeys[0]] + "\"";
                    }
                }

                return message + ".";
            };

            var NotFoundException = function(previous, subject, identifier) {
                this.identifier = identifier;
                this.previous = previous;
                this.subject = subject;

                this.message = generateMessage(subject, identifier);
            }

            NotFoundException.prototype = new Exception();
            NotFoundException.prototype.constructor = NotFoundException;

            return NotFoundException;
        })
    ;

})(angular);
